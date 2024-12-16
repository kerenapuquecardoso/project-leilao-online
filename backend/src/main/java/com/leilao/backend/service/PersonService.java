package com.leilao.backend.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.leilao.backend.entity.Person;
import com.leilao.backend.entity.PersonAuthResponseDTO;
import com.leilao.backend.entity.PersonUpdatePasswordDTO;
import com.leilao.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class PersonService implements UserDetailsService{
    
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private EmailService emailService;

    @PersistenceContext
    private EntityManager entityManager;

    public boolean emailJaCadastrado(String email) {
        return personRepository.findByEmail(email).isPresent();
    }

    public Person salvar(Person person) {
        if (emailJaCadastrado(person.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }
        Context context = new Context();
        context.setVariable("name", person.getNome());
        context.setVariable("email", person.getEmail());
        Person personSave = personRepository.save(person);
        try {
           
            emailService.sendTemplateEmail(personSave.getEmail(), "Cadastro efetuado com sucesso", context, "emailWelcome");
        } catch (MessagingException e) {
            System.out.println("ERROR: ERRO AO ENVIAR EMAIL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            e.printStackTrace();
        }
    
        return  personSave;
    }

    public Person changePassword(PersonUpdatePasswordDTO personDto) {
        Optional<Person> person = personRepository.findByEmail(personDto.getEmail());
        try {
            Person personDatabase = person.get();

            SecureRandom secureRandom = new SecureRandom();
            int randomNumber = secureRandom.nextInt(1_000_000);
            
            String formattedNumber = String.format("%06d", randomNumber);
            personDatabase.setValidationCode(Integer.parseInt(formattedNumber));
            
           
            LocalDateTime data = LocalDateTime.now().plusMinutes(120);
            if(data == null){
                throw new RuntimeException("Data de validade do código deu erro e não foi definida corretamente " + data);
            }
            personDatabase.setValidationCodeValidity(data);
            
            Context context = new Context();
            context.setVariable("name", personDatabase.getNome());
            context.setVariable("validationCode", formattedNumber);

            try {
                personRepository.save(personDatabase);
                emailService.sendTemplateEmail(personDatabase.getEmail(), "Código enviado para o email cadastrado", context, "emailUpdatePassword");
            } catch (MessagingException e) {
                System.out.println("ERROR: ERRO AO ENVIAR EMAIL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                e.printStackTrace();
            }
            return personDatabase;
        } catch (RuntimeException err) {
            throw new RuntimeException("Erro ao trocar de imagens");
        }
    }

    public Person updateNewPassword(PersonAuthResponseDTO person) {
        Optional<Person> personSalvo = personRepository.findByEmailAndValidationCode(person.getEmail(), person.getCode());
        if (personSalvo.isEmpty()) {
            throw new RuntimeException("Usuário ou código inválido");
        }

        Person personDatabase = personSalvo.get();
        LocalDateTime dataAtual = LocalDateTime.now();
        LocalDateTime validadeCodigo = personDatabase.getValidationCodeValidity();
        System.out.println("VALIDADE DO CÓDIGO" + validadeCodigo);
        System.out.println("DATA ATUAL" + dataAtual);

        if (validadeCodigo == null) {
            throw new RuntimeException("Validade do código não definida");
        }

        if (dataAtual.isAfter(validadeCodigo)) {
            throw new RuntimeException("Código expirado");
        }

        personDatabase.setPassword(person.getNewPassword());
        personRepository.save(personDatabase);
        return personDatabase;
    }


    public Person update(Person person){
        Person personSalvo = personRepository.findById(person.getId()).orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        personSalvo.setEmail(person.getEmail());
        personSalvo.setNome(person.getNome());
        return personSalvo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario não encontrado"));
    }


    public Boolean validarUser(String email) {
        Optional<Person> personEmail = personRepository.findByEmail(email);
        if (personEmail.isEmpty()) {
            return false;
        }
        Person personValidity = personEmail.get();
        personValidity.setStatus(true);
        personRepository.save(personValidity);
        return true;
    }


}

package com.leilao.backend.service;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;
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
        if(emailJaCadastrado(person.getEmail())){
            throw new IllegalArgumentException("Email já cadastrado");
        }
        Person personSave = personRepository.save(person);
        Context context = new Context();
        context.setVariable("name", personSave.getNome()); // Adiciona a variável "name" ao contexto
        try {
            emailService.sendTemplateEmail(personSave.getEmail(), "Cadastro efetuado com sucesso", context, "emailWelcome");
        } catch (MessagingException e) {
            System.out.println("ERROR: ERRO AO ENVIAR EMAIL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            e.printStackTrace();
        }
        return personSave;
    }

    public String changePassword(PersonUpdatePasswordDTO personDto) {
        Optional<Person> person = personRepository.findByEmail(personDto.getEmail());
        if (person.isPresent()) {
            Person personDatabase = person.get();

            SecureRandom secureRandom = new SecureRandom();
            int randomNumber = secureRandom.nextInt(1_000_000);
            
            String formattedNumber = String.format("%06d", randomNumber);
            personDatabase.setValidationCode(Integer.parseInt(formattedNumber));
            
            Date data = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(data);
            calendar.add(Calendar.MINUTE, 120); 
            Date dataAjustada = calendar.getTime();
            personDatabase.setValidationCodeValidity(dataAjustada);
            
            Context context = new Context();
            context.setVariable("name", personDatabase.getNome());
            context.setVariable("validationCode", formattedNumber);

            try {
                personRepository.save(personDatabase);
                emailService.sendTemplateEmail(personDatabase.getEmail(), "Alteração de senha efetuada com sucesso", context, "emailUpdatePassword");
            } catch (MessagingException e) {
                System.out.println("ERROR: ERRO AO ENVIAR EMAIL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                e.printStackTrace();
            }
            return "Código enviado para o email cadastrado " + personDatabase.getValidationCodeValidity();
        } else {
            return "Email não cadastrado";
        }
    }

    public String updateNewPassword(PersonAuthResponseDTO person) {
        Optional<Person> personSalvo = personRepository.findByEmailAndValidationCode(person.getEmail(), person.getCode());
        if (personSalvo.isEmpty()) {
            return "Usuário ou código inválido";
        }

        Person personDatabase = personSalvo.get();
        Date dataAtual = new Date(); 
        Date validadeCodigo = personDatabase.getValidationCodeValidity();

        if (validadeCodigo == null) {
            return "Validade do código não definida";
        }

        if (dataAtual.after(validadeCodigo)) {
            return "Código expirado";
        }

        personDatabase.setPassword(person.getNewPassword());
        personRepository.save(personDatabase);
        return "Senha alterada com sucesso!";
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


}

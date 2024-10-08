package com.leilao.backend.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.leilao.backend.entity.Person;
import com.leilao.backend.repository.PersonRepository;

import jakarta.mail.MessagingException;

@Service
public class PersonService {
    
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private EmailService emailService;

    public Person salvar(Person person){
        Person personSave = personRepository.save(person);
        Context  context = new Context();
        context.setVariable("name", personSave.getNome());
        try {
            emailService.sendTemplateEmail(personSave.getEmail(), "Cadastro efetuado com sucesso", null, "emailWelcome");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return personSave; 
    }

    public Person update(Person person){
        Person personSalvo = personRepository.findById(person.getId()).orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        personSalvo.setEmail(person.getEmail());
        personSalvo.setNome(person.getNome());
        return personSalvo;
    }


}

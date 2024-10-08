package com.leilao.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.entity.Person;
import com.leilao.backend.service.PersonService;



@RequestMapping("/person")
@RestController
public class PersonController {

    @Autowired
    PersonService personService;

    @PostMapping("/save")
    public Person salvar(@RequestBody Person person){
        return personService.salvar(person);
    }

    @PatchMapping("/update")
    public Person update(@RequestBody Person person){
        return personService.salvar(person);
    }
}

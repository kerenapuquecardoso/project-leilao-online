package com.leilao.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.entity.Person;
import com.leilao.backend.entity.PersonAuthRequestDTO;
import com.leilao.backend.entity.PersonAuthResponseDTO;
import com.leilao.backend.entity.PersonUpdatePasswordDTO;
import com.leilao.backend.security.JwtService;
import com.leilao.backend.service.PersonService;



@RequestMapping("/api/person")
@RestController
public class PersonController {

    @Autowired
    PersonService personService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public String postMethodName(@RequestBody PersonAuthRequestDTO dto) {
       Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
        return jwtService.generateToken(authentication.getName());
    }

   @PostMapping("/code-password")
    public String passwordCodeRequest(@RequestBody PersonUpdatePasswordDTO dto){
        return personService.changePassword(dto);
    }

    @PostMapping("/save")
    public Person salvar(@RequestBody Person person){
        return personService.salvar(person);
    }

    @PatchMapping("/update")
    public String update(@RequestBody PersonAuthResponseDTO person){
        return personService.updateNewPassword(person);
    }
}

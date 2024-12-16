package com.leilao.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.entity.Person;
import com.leilao.backend.entity.PersonAuthRequestDTO;
import com.leilao.backend.entity.PersonAuthResponseDTO;
import com.leilao.backend.entity.PersonUpdatePasswordDTO;
import com.leilao.backend.security.JwtService;
import com.leilao.backend.service.PersonService;


@RequestMapping("/api/person")
@RestController
@CrossOrigin
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

   @PostMapping("/change-password")
    public ResponseEntity<Person> passwordCodeRequest(@RequestBody PersonUpdatePasswordDTO dto){
        Person res = personService.changePassword(dto);
        if(res == null){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return new ResponseEntity<>(res , HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Person> salvar(@RequestBody Person person){
        Person res = personService.salvar(person);
        if(res == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return new ResponseEntity<>(res , HttpStatus.CREATED);
    }

    @PatchMapping("/update")
    public ResponseEntity<Person> update(@RequestBody PersonAuthResponseDTO person){
        Person res = personService.updateNewPassword(person);
        if (res == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/validate-user")
    public ResponseEntity<Void> validateUser(@RequestParam() String email) {
        try {
            personService.validarUser(email);
            return ResponseEntity.status(HttpStatus.OK).build();

        } catch (UsernameNotFoundException ex) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
}

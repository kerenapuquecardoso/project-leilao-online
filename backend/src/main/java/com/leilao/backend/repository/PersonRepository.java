package com.leilao.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    
    Optional<Person> findByEmail(String email);

    Optional<Person> findByEmailAndValidationCode(String email, Integer validationCode);

}

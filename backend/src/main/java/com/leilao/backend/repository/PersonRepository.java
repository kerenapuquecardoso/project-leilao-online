package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    
}

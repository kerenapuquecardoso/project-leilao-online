package com.leilao.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.entity.Auction;
import com.leilao.backend.entity.Person;



public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByPerson(Person person);

    Auction findByIdAndPerson(Long id, Person person);
}
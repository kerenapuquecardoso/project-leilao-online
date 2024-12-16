package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leilao.backend.entity.Porfile;

@Repository
public interface  PorfileRepository  extends  JpaRepository<Porfile, Long>{
    
}

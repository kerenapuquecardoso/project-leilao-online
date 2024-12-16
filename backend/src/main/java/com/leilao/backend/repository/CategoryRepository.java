package com.leilao.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leilao.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
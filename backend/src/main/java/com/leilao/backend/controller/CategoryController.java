package com.leilao.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leilao.backend.entity.Category;
import com.leilao.backend.service.CategoryService;

import jakarta.websocket.server.PathParam;
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public Category create(@RequestBody Category category) {
        try {
            categoryService.create(category);
        } catch (Exception e) {
            System.out.println("erro ao criar categoria: " + e.getMessage());
        }
        return categoryService.create(category);
    }

    @PutMapping
    public Category update(@RequestBody Category category) {
        return categoryService.create(category);
    }

    @GetMapping
    public List<Category> listAll() {
        return categoryService.listAll();
    }

    @GetMapping("/teste")
    public String teste() {
        return "Teste passed";
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        categoryService.delete(id);
    }

    @GetMapping("/find")
    public String find(@PathParam("name") String name,
            @PathParam("age") Integer age) {    
        System.out.println(name + " " + age);
        return name + " " + age;
    }
}
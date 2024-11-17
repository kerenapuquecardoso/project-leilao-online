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

import com.leilao.backend.entity.Porfile;
import com.leilao.backend.service.PorfileService;

@RestController
@RequestMapping("api/login")
public class PorfileController {

    @Autowired
    private PorfileService porfileService;

    @PostMapping("/submit")
    public Porfile save(@RequestBody Porfile porfile) {
        return porfileService.salvar(porfile);
    }

    @PutMapping("/reset-password/alter-password")
    public Porfile alterPassword(@RequestBody Porfile porfile) {
        return porfileService.update(porfile);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id){
        porfileService.delete(id);
    }

    @GetMapping
    public List<Porfile> listAll() {
        return porfileService.listAll();
    }
    
}

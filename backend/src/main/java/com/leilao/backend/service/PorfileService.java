package com.leilao.backend.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leilao.backend.entity.Porfile;
import com.leilao.backend.repository.PorfileRepository;

@Service
public class PorfileService {
    
    @Autowired
    private PorfileRepository porfileRepository;

    public Porfile salvar(Porfile porfile){
        Porfile porfileSave = porfileRepository.save(porfile);
        return porfileSave; 
    }

    public Porfile update(Porfile porfile){
        Porfile porfileSalvo = porfileRepository.findById(porfile.getId()).orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        porfileSalvo.setName(porfile.getName());
        return porfileSalvo;
    }

    public void delete(Long Id){
        Porfile porfileSalvo = porfileRepository.findById(Id).orElseThrow(() -> new NoSuchElementException("Objeto não encontrado"));
        porfileRepository.delete(porfileSalvo);
    }

    public List<Porfile> listAll(){
        return porfileRepository.findAll();
    }


}

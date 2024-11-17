package com.leilao.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PersonAuthRequestDTO {
    private String email;
    private String password;
    
}

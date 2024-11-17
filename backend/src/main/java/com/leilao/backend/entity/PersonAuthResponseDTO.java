package com.leilao.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonAuthResponseDTO {
    String email;
    Integer code;
    String newPassword;
}

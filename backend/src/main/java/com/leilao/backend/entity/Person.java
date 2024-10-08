package com.leilao.backend.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Data
@Entity
@Table(name = "tb_person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank // adicionar (message=)
    private String nome;
    private String email;

    @JsonIgnore
    private String password;

    @Column(name = "validation_code")
    private String validationCode;

    @JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "validation_code_validity")
    private Date validationCodeValidity;

    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.ALL)
    @Setter(value = AccessLevel.NONE)
    private List<PersonPorfile> porfilePerson;

    public void setporfilePerson(List<PersonPorfile> porfilePersons) {
        for (PersonPorfile p : porfilePersons) {
            p.setPerson(this);
        }
        porfilePerson = porfilePersons;
    }

}

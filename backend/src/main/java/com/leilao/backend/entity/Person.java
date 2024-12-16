package com.leilao.backend.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

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
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Table(name = "tb_person")
@JsonIgnoreProperties("authorities")
@AllArgsConstructor
@NoArgsConstructor
public class Person implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank 
    private String nome;

    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Transient
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Column(unique = true)
    private Integer validationCode;

    @Column(name="status")
    private Boolean status = false;

    @JsonIgnore
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "validation_code_validity")
    private LocalDateTime validationCodeValidity;

    @Transient
    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.ALL)
    @Setter(value = AccessLevel.NONE)
    private List<PersonPorfile> porfilePerson = new ArrayList<>();

    public void setporfilePerson(List<PersonPorfile> porfilePersons) {
        for (PersonPorfile p : porfilePersons) {
            p.setPerson(this);
        }
        porfilePerson = porfilePersons;
    }

    public void setPassword(String password){
        this.password = passwordEncoder.encode(password);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return porfilePerson.stream()
        .map(userRole -> new SimpleGrantedAuthority(userRole.getPorfile().getName()))
        .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return email;
    }

}

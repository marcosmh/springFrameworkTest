package com.xpertia.software.springboot.backend.apirest.models.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name="clientes")
@Data
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long id;

    @NotEmpty
    @Size(min=1, max=50)
    @Column(name="nombre",nullable = false)
    private String nombre;

    @NotEmpty
    @Size(min=1, max=50)
    @Column(name="apellido",nullable = false)
    private String apellido;

    @NotEmpty
    @Email
    @Column(name="email",nullable = false, unique = true)
    private String email;

    @Column(name="create_at")
    @Temporal(TemporalType.DATE)
    private Date createAt;

    @PrePersist
    public void prePersist() {
        createAt = new Date();
    }
}

package com.xpertia.software.springboot.backend.apirest.models.services;

import com.xpertia.software.springboot.backend.apirest.models.entity.Cliente;

import java.util.List;

public interface IClienteService {
    List<Cliente> findAll();
}

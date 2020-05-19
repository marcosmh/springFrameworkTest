package com.xpertia.software.springboot.backend.apirest.controller;

import com.xpertia.software.springboot.backend.apirest.models.entity.Cliente;
import com.xpertia.software.springboot.backend.apirest.models.services.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClienteRestController {

    @Autowired
    private IClienteService clienteService;

    @GetMapping("/clientes")
    public List<Cliente> index() {
        return clienteService.findAll();
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<?> showClienteById(@PathVariable Long id) {

        Map<String, Object> response = new HashMap<>();
        Cliente cliente = null;
        try {
            cliente = clienteService.findById(id);
        }  catch(DataAccessException e ) {
            response.put("mensaje","Error al consultar en la base de datos.");
            response.put("error",e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        } catch(NumberFormatException e ) {
            response.put("mensaje","El ID debe ser de tipo númerico.");
            response.put("error",e.getMessage());
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if(null == cliente) {
            response.put("mensaje","El cliente con ID: ".concat(id.toString().concat(" no existe en la base de datos.")));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
    }

    @PostMapping("/clientes")
    public ResponseEntity<?> saveCliente(@RequestBody Cliente cliente) {
        Map<String, Object> response = new HashMap<>();
        Cliente clienteNew = null;

        try {
            clienteNew = clienteService.save(cliente);
        } catch(DataAccessException e) {
            response.put("mensaje","Error al guardar el insert en la base de datos.");
            response.put("error",e.getMessage().concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje","El cliente ha sido creado con exito!");
        response.put("cliente",clienteNew);

        return new ResponseEntity<Map<String, Object>>(response,HttpStatus.CREATED);
    }

    @PutMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente updateCliente(@RequestBody Cliente cliente, @PathVariable Long id) {
        Cliente clienteActual = clienteService.findById(id);
        clienteActual.setNombre(cliente.getNombre());
        clienteActual.setApellido(cliente.getApellido());
        clienteActual.setEmail(cliente.getEmail());
        return clienteService.save(clienteActual);
    }

    @DeleteMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCliente(@PathVariable Long id) {
        clienteService.delete(id);
    }

}
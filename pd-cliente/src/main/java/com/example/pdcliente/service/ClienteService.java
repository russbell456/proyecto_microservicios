package com.example.pdcliente.service;

import com.example.pdcliente.dto.ClienteLoginDTO;
import com.example.pdcliente.entity.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteService {
    List<Cliente> listar();
    Optional<Cliente> buscar(Integer id);
    Cliente guardar(Cliente cliente);

    Optional<Cliente> login(ClienteLoginDTO loginDTO);

    Cliente actualizar(Integer id, Cliente cliente);
    void eliminar(Integer id);

}

package org.example.msfacturacion.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "pd-clientes", path = "/clientes")
public interface ClienteFeign {
    @GetMapping("/{id}")
    Object obtenerCliente(@PathVariable("id") Long id);
}
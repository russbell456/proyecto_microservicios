package org.example.msfacturacion.controller;

import lombok.RequiredArgsConstructor;
import org.example.msfacturacion.dato.VentaDTO;
import org.example.msfacturacion.entity.Factura;
import org.example.msfacturacion.service.FacturaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/facturas")
@RequiredArgsConstructor
public class FacturaController {

    private final FacturaService service;

    /** Lista facturas con filtro opcional por cliente */
    @GetMapping
    public ResponseEntity<List<Factura>> listar(@RequestParam(required = false) Long clienteId) {
        return ResponseEntity.ok(
                clienteId == null ? service.listar() : service.listarPorCliente(clienteId));
    }

    /** Ventas pagadas que aún no tienen factura */
    @GetMapping("/ventas-por-facturar")
    public ResponseEntity<List<VentaDTO>> ventasPorFacturar() {
        return ResponseEntity.ok(service.ventasPorFacturar());
    }

    /** Recibe lista de IDs de ventas y genera factura */
    @PostMapping
    public ResponseEntity<Factura> generar(@RequestBody List<Long> ventaIds) {
        return ResponseEntity.ok(service.generarFactura(ventaIds));
    }
}
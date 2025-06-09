package org.example.msfacturacion.service.impl;

import lombok.RequiredArgsConstructor;
import org.example.msfacturacion.entity.Factura;
import org.example.msfacturacion.entity.FacturaVenta;
import org.example.msfacturacion.dato.VentaDTO;
import org.example.msfacturacion.feign.VentaFeign;
import org.example.msfacturacion.repository.FacturaRepository;
import org.example.msfacturacion.repository.FacturaVentaRepository;
import org.example.msfacturacion.service.FacturaService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacturaServiceImpl implements FacturaService {

    private final FacturaRepository facturaRepo;
    private final FacturaVentaRepository fvRepo;
    private final VentaFeign ventaFeign;

    private final AtomicLong secuencial = new AtomicLong(1);

    @Override
    public List<Factura> listar() {
        return facturaRepo.findAll();
    }

    @Override
    public List<Factura> listarPorCliente(Long clienteId) {
        return facturaRepo.findByClienteId(clienteId);
    }

    @Override
    public List<VentaDTO> ventasPorFacturar() {
        List<VentaDTO> pagadas = ventaFeign.listarPagadas();
        return pagadas.stream()
                .filter(v -> !fvRepo.existsByVentaId(v.getId()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Factura generarFactura(List<Long> ventaIds) {
        if (ventaIds == null || ventaIds.isEmpty()) {
            throw new IllegalArgumentException("Se requiere al menos una venta");
        }

        // Validar que no estén facturadas
        List<FacturaVenta> previas = fvRepo.findByVentaIdIn(ventaIds);
        if (!previas.isEmpty()) {
            throw new RuntimeException("Alguna venta ya fue facturada: " + previas.stream()
                    .map(FacturaVenta::getVentaId).collect(Collectors.toList()));
        }

        // Obtener ventas
        List<VentaDTO> ventas = ventaIds.stream()
                .map(ventaFeign::obtenerVenta)
                .collect(Collectors.toList());

        // Deben pertenecer al mismo cliente
        Long clienteId = ventas.get(0).getClienteId();
        if (ventas.stream().anyMatch(v -> !clienteId.equals(v.getClienteId()))) {
            throw new RuntimeException("Todas las ventas deben ser del mismo cliente");
        }

        // Construir factura
        Factura factura = new Factura();
        factura.setClienteId(clienteId);
        factura.setFechaEmision(LocalDateTime.now());
        factura.setNumero(String.format("F001-%08d", secuencial.getAndIncrement()));
        factura.setEstado("GENERADA");

        BigDecimal total = BigDecimal.ZERO;
        List<FacturaVenta> listaFV = new ArrayList<>();
        for (VentaDTO v : ventas) {
            FacturaVenta fv = new FacturaVenta();
            fv.setVentaId(v.getId());
            fv.setFechaVenta(v.getFechaEmision());
            fv.setTotalVenta(v.getTotal());
            fv.setFactura(factura);
            listaFV.add(fv);
            total = total.add(v.getTotal());
        }

        factura.setTotal(total);
        factura.setVentas(listaFV);

        return facturaRepo.save(factura);
    }
}
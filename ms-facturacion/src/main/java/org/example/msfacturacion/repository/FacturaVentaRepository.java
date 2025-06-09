package org.example.msfacturacion.repository;

import org.example.msfacturacion.entity.FacturaVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaVentaRepository extends JpaRepository<FacturaVenta, Long> {
    boolean existsByVentaId(Long ventaId);
    List<FacturaVenta> findByVentaIdIn(List<Long> ventaIds);
}
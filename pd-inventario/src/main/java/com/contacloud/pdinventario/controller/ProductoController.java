package com.contacloud.pdinventario.controller;

import com.contacloud.pdinventario.model.Producto;
import com.contacloud.pdinventario.repository.ProductoRepository;
import com.contacloud.pdinventario.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
@RestController
@RequestMapping("/productos") // Ruta base para este controlador
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // GET /productos
    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listar();
    }

    // GET /productos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProducto(@PathVariable Long id) {
        return productoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /productos
    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.guardar(producto));
    }

    // PUT /productos/{id}/reducir-stock
    @PutMapping("/{id}/reducir-stock")
    public ResponseEntity<Void> reducirStock(
            @PathVariable Long id,
            @RequestParam int cantidad
    ) {
        productoService.reducirStock(id, cantidad);
        return ResponseEntity.ok().build();
    }

    // PATCH /productos/{id}/stock
    @PatchMapping("/{id}/stock")
    public ResponseEntity<String> actualizarStock(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        Integer cantidad = request.get("cantidad");
        if (cantidad == null) {
            return ResponseEntity.badRequest().body("Falta el campo 'cantidad' en el cuerpo.");
        }
        productoService.actualizarStock(id, cantidad);
        return ResponseEntity.ok("Stock actualizado correctamente.");
    }

    // DELETE /productos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

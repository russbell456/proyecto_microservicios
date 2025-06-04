import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../core/services/producto.service';
@Component({
  selector: 'app-catalogo-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-productos.component.html',
  styleUrl: './catalogo-productos.component.scss',
})
export class CatalogoProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.listarProductos().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => alert('Error al cargar productos')
    });
  }
}

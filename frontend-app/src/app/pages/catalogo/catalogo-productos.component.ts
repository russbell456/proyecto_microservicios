import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-catalogo-productos',
  standalone: true,
  templateUrl: './catalogo-productos.component.html',
  styleUrl: './catalogo-productos.component.scss',
})
export class CatalogoProductosComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }
}

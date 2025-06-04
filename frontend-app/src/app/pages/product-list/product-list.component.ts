import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>Productos</h2>
    <div *ngFor="let producto of productos" class="producto">
      <h3>{{ producto.nombre }}</h3>
      <p>Precio: {{ producto.precio | currency:'USD' }}</p>
      <button (click)="agregarAlCarrito(producto)">Agregar al carrito</button>
    </div>
  `,
  styles: [`
    .producto { border: 1px solid #ddd; padding: 10px; margin-bottom: 8px; }
  `]
})
export class ProductListComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8082/api/productos').subscribe({
      next: res => this.productos = res,
      error: err => console.error('Error cargando productos', err)
    });
  }

  agregarAlCarrito(producto: any) {
    this.cartService.addProduct(producto);
  }
}

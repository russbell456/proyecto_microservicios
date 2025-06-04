import { Component } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <h2>Confirmar Compra</h2>
    <div *ngIf="items.length; else vacio">
      <ul>
        <li *ngFor="let item of items">
          {{ item.nombre }} - {{ item.cantidad }} x {{ item.precio | currency:'USD' }}
        </li>
      </ul>
      <p><strong>Total:</strong> {{ total | currency:'USD' }}</p>
      <button (click)="confirmarCompra()">Confirmar Compra</button>
    </div>
    <ng-template #vacio>
      <p>No hay productos en el carrito.</p>
    </ng-template>
  `,
  styles: [`
    ul { list-style-type: none; padding-left: 0; }
    li { padding: 5px 0; }
  `]
})
export class CheckoutComponent {
  items = this.cartService.getItems();
  total = this.cartService.getTotal();

  constructor(private cartService: CartService, private http: HttpClient) {}

  confirmarCompra() {
    const venta = {
      clienteId: 1, // En producción, tomar del token o sesión
      productos: this.items.map(item => ({ productoId: item.id, cantidad: item.cantidad }))
    };

    this.http.post('http://localhost:8083/api/ventas', venta).subscribe({
      next: () => {
        alert('¡Compra realizada con éxito!');
        this.cartService.clearCart();
      },
      error: err => {
        console.error('Error al realizar la compra', err);
        alert('Error al procesar la compra');
      }
    });
  }
}

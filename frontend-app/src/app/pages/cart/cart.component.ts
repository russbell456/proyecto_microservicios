import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Carrito</h2>
    <div *ngIf="(items$ | async)?.length; else vacio">
      <div *ngFor="let item of items$ | async" class="item">
        <strong>{{ item.nombre }}</strong> - {{ item.cantidad }} x {{ item.precio | currency:'USD' }}
        <button (click)="eliminar(item.id)">Eliminar</button>
      </div>
      <p><strong>Total:</strong> {{ total | currency:'USD' }}</p>
      <button (click)="confirmarCompra()">Confirmar Compra</button>
    </div>
    <ng-template #vacio>
      <p>El carrito está vacío.</p>
    </ng-template>
  `,
  styles: [`
    .item { border-bottom: 1px solid #ccc; padding: 6px 0; }
    button { margin-left: 10px; }
  `]
})
export class CartComponent {
  items$: Observable<any[]>;
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.items$ = this.cartService.cart$;
    this.cartService.cart$.subscribe(items => {
      this.total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    });
  }

  eliminar(productId: number) {
    this.cartService.removeProduct(productId);
  }

  confirmarCompra() {
    this.router.navigate(['/confirmar-compra']);
  }
}

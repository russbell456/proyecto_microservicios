import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  addProduct(product: any) {
    const items = this.cart.getValue();
    const existing = items.find(p => p.id === product.id);
    if (existing) {
      existing.cantidad += 1;
    } else {
      items.push({ ...product, cantidad: 1 });
    }
    this.cart.next([...items]);
  }

  removeProduct(productId: number) {
    const items = this.cart.getValue().filter(p => p.id !== productId);
    this.cart.next([...items]);
  }

  clearCart() {
    this.cart.next([]);
  }

  getItems() {
    return this.cart.getValue();
  }

  getTotal() {
    return this.getItems().reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  }
}

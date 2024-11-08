import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Cart[] = []
  private cartSubject = new BehaviorSubject<Cart[]>(this.cartItems)

  cart$ = this.cartSubject.asObservable()

  constructor() { }

  addToCart(item: Cart) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id)

    if(existingItem) {
      existingItem.quantity += item.quantity
    }else {
      this.cartItems.push(item)
    }

    this.cartSubject.next([...this.cartItems])
    console.log('Item adicionado:', item);
    console.log('Conteúdo do carrinho:', this.cartItems);
  }

  getCartItems(): Cart[] {
    return [...this.cartItems]
  }

  getTotalValue() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

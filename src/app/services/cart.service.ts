import { Injectable } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Cart[] = [];
  private cartSubject = new BehaviorSubject<Cart[]>(this.cartItems);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  addToCart(item: Cart) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }

    this.saveCartToLocalStorage();
    this.cartSubject.next([...this.cartItems]);
  }

  getCartItems(): Cart[] {
    return [...this.cartItems];
  }

  removeItem(itemId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveCartToLocalStorage();
    this.cartSubject.next([...this.cartItems]);
  }

  incrementQuantity(itemId: string) {
    const item = this.cartItems.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity += 1;
      this.updateCart();
    }
  }

  decrementQuantity(itemId: string) {
    const item = this.cartItems.find(cartItem => cartItem.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.updateCart();
    }
  }

  getTotalValue() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  private updateCart() {
    this.saveCartToLocalStorage();
    this.cartSubject.next([...this.cartItems]);
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}

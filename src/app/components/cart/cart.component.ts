import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Cart[] = [];
  totalValue = 0;
  
  alert = new AlertComponent();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.updateTotalValue();
    });
  }

  removeItem(itemId: string | undefined) {
    if (itemId) {
      this.cartService.removeItem(itemId);
    }
    this.alert.showAlert('Produto removido com sucesso', 'error')
  }

  incrementQuantity(itemId: string | undefined) {
    if (itemId) {
      this.cartService.incrementQuantity(itemId);
    }
  }

  decrementQuantity(itemId: string | undefined) {
    if(itemId) {
      this.cartService.decrementQuantity(itemId);
    }
  }

  updateTotalValue() {
    this.totalValue = this.cartService.getTotalValue();
  }
  
}

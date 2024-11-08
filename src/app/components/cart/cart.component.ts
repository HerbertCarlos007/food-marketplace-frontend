import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../interfaces/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: Cart[] = []
  totalValue = 0 

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems()
  }

  getCartItems() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items
      console.log('Itens do carrinho atualizados:', this.cartItems);
    })

    this.totalValue = this.cartService.getTotalValue()
  }

  removeItem(itemId: string | undefined) {
    if (itemId) { 
      this.cartService.removeItem(itemId);
    }
  }
  
}

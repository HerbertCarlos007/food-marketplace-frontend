import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  storeId: string = '';
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    const getStoreId = localStorage.getItem('store_id');
    this.storeId = getStoreId !== null ? getStoreId : '';

    this.productService.getAllProducts(this.storeId).subscribe({
      next: (response) => {
        this.products = response
      },
      error: (error) => {
        console.error('Erro ao obter produtos:', error);
      }
    });
  }

}

import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  storeId: string = '';
  productsByCategory: { [key: string]: Product[] } = {};

  @Input() searchProduct: string = '';

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
    
  }

  getAllProducts() {
    const getStoreId = localStorage.getItem('store_id');
    this.storeId = getStoreId !== null ? getStoreId : '';

    this.productService.getAllProducts(this.storeId).subscribe({
      next: (response) => {
        const activeProducts = response.filter(
          (product) => product.status === 'ativo'
        );
        this.groupProductsByCategory(activeProducts);
      },
      error: (error) => {
        console.error('Erro ao obter produtos:', error);
      },
    });
  }

  groupProductsByCategory(products: Product[]) {
    this.productsByCategory = products.reduce((acc, product) => {
      const category = product.categoryName || 'Outros';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as { [key: string]: Product[] });
  }
}

import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../../interfaces/cart';
import { CartService } from '../../services/cart.service';
import { AlertComponent } from '../alert/alert.component';
import { LoginService } from '../../services/login.service';

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
  
  alert = new AlertComponent();

  @Input() searchProduct: string = '';

  constructor(private productService: ProductsService, private cartService: CartService, private loginService: LoginService) {}
  

  ngOnInit(): void {
    this.getAllProducts();
    
  }

  ngOnChanges() {
    this.getAllProducts()
  }

  getAllProducts() {
    const getStoreId = localStorage.getItem('store_id');
    this.storeId = getStoreId !== null ? getStoreId : '';

    this.productService.getAllProducts(this.storeId).subscribe({
      next: (response) => {
        const inStockProducts = response.filter(
          (product) => (product.inStock === 'true' && product.name.toLowerCase().includes(this.searchProduct.toLowerCase()))
          
        );
        this.groupProductsByCategory(inStockProducts);
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

  addToCart(product: Product) {
    const cartItem: Cart = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    }

    this.cartService.addToCart(cartItem)
    this.alert.showAlert('Produto adicionando com sucesso', 'success')
  }
}

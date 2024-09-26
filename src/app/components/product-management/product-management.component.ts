import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../modal/modal.component';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule ,FontAwesomeModule, ModalComponent, FormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent {
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  faFilter = faFilter;

  isModalOpen: boolean = false;

  name: string = '';
  imageUrl: File | null = null;
  price: number | '' = '';
  storeId: string = '';
  status: string = 'ativo';
  productType: string = '';

  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getAllProducts()
  }

  setOpenModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  setCloseModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.imageUrl = file;
  }

  create() {
    const getStoreId = localStorage.getItem('store_id');
    this.storeId = getStoreId !== null ? getStoreId : '';

    if (!this.imageUrl) {
      console.error('Nenhum arquivo selecionado!');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('price', this.price.toString());
    formData.append('storeId', this.storeId);
    formData.append('status', this.status);
    formData.append('productType', this.productType);
    formData.append('imageUrl', this.imageUrl);
    this.productService.create(formData);
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

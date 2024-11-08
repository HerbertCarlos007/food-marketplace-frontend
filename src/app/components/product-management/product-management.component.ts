import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../modal/modal.component';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
import { ConfirmationModalComponent } from "../confirmation-modal/confirmation-modal.component";
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ModalComponent, FormsModule, ReactiveFormsModule, ConfirmationModalComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent {
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  faFilter = faFilter;

  products: Product[] = [];
  categoriesList: Category[] = [];

  productId: string = ''
  storeId: string = '';
  id: string = ''
  status: string = 'ativo';
  imageUrl: File | null = null;
  productForm: FormGroup

  filterName: string = ''
  filterStatus: string = ''
  filterProductType: string = ''
  filteredProducts: Product[] = [];

  isModalOpen: boolean = false;
  isModalConfirmOpen: boolean = false;
  isEditMode: boolean = false

  alert = new AlertComponent();

  constructor(
    private productService: ProductsService, private categoryService: CategoriesService, private fb: FormBuilder) {
      this.productForm = fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        productType: ['', Validators.required],
        categories: ['', Validators.required],
      })
    }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllCategories()
  }


  getErrorProductForm(controlName: string): string | null {
    const control = this.productForm.get(controlName)
  
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) {
        return 'Este campo é obrigatório.';
      }
    }
    return null
  }
  
  setOpenModal(isEdit: boolean = false, product?: Product) {
    this.isModalOpen = true
    this.isEditMode = isEdit

    if(isEdit && product) {
      this.id = String(product.id),
      this.imageUrl = null
      this.productForm.patchValue({
      name: product.name,
      price: product.price,
      productType: product.productType,
      categories:  product.categoryId,
     })
    }else {
      this.productForm.reset({
        productType: '',
        categories: ''
      })
      this.imageUrl = null
    }
   
  }

  setOpenModalConfirm(product?: Product) {
    this.isModalConfirmOpen = true;
    const getStoreId = localStorage.getItem('store_id');
    this.storeId = getStoreId !== null ? getStoreId : '';
    this.productId = String(product?.id);
  }
  

  setCloseModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  setCloseModalConfirm(): void {
    this.isModalConfirmOpen = !this.isModalConfirmOpen
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.imageUrl = file;
  }

  create() {
    const getStoreId = localStorage.getItem('store_id');
    this.storeId = getStoreId !== null ? getStoreId : '';

    if (this.productForm.invalid, !this.imageUrl) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('storeId', this.storeId);
    formData.append('status', this.status);
    formData.append('productType', this.productForm.get('productType')?.value);
    formData.append('categoryId', this.productForm.get('categories')?.value);
    formData.append('imageUrl', this.imageUrl);
    formData.append('accompaniments', 'salada')
    this.productService.create(formData);
    this.setCloseModal()
    this.getAllProducts()
    this.alert.showAlert('Produto criado com sucesso', 'success')
  }

  updateProduct() {
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('productType', this.productForm.get('productType')?.value);
    formData.append('status', this.status);
    formData.append('categoryId', this.productForm.get('categories')?.value);
    formData.append('imageUrl', this.imageUrl!);
    formData.append('accompaniments', 'salada')
    this.productService.update(formData, this.id);
    this.setCloseModal();
    this.getAllProducts()
    this.alert.showAlert('Produto alterado com sucesso', 'success')
  }

  getAllProducts() {
    const getStoreId = localStorage.getItem('store_id');
    this.storeId = getStoreId !== null ? getStoreId : '';

    this.productService.getAllProducts(this.storeId).subscribe({
      next: (response) => {
        this.products = response;
        this.filteredProducts = response
      },
      error: (error) => {
        console.error('Erro ao obter produtos:', error);
      },
    });
  }

  searchProduct(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.filterName = target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.filterName)
    );
  }

  searchStatus(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.filterStatus = target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.status.toLowerCase().includes(this.filterStatus)
    );
  }

  searchProductType(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.filterProductType = target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.productType.toLowerCase().includes(this.filterProductType)
    );
  }

  getAllCategories() {
    const getStoreId = localStorage.getItem('store_id');
    this.storeId = getStoreId !== null ? getStoreId : '';
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categoriesList = response
      },
      error: (error) => {
        console.error('Erro ao obter categorias:', error);
      }
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.storeId, this.productId).subscribe({
      next: () => {
        this.setCloseModalConfirm()
        this.getAllProducts()
        this.alert.showAlert('Produto deletado com sucesso', 'error')
      },
      error: (err) => {
        console.error('Erro ao excluir o produto:', err);
      }
    });
  }
  
}
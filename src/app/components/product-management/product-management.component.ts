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
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule ,FontAwesomeModule, ModalComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent {
  faPlus = faPlus;
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  faFilter = faFilter;

  isModalOpen: boolean = false;
  isEditMode: boolean = false

  productForm: FormGroup

  id: string = ''
  imageUrl: File | null = null;
 
  storeId: string = '';
  status: string = 'ativo';


  products: Product[] = [];
  categoriesList: Category[] = [];

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
    this.productService.create(formData);

    this.setCloseModal()
  }

  updateProduct() {
    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('productType', this.productForm.get('productType')?.value);
    formData.append('status', this.status);
    formData.append('categoryId', this.productForm.get('categories')?.value);
    formData.append('imageUrl', this.imageUrl!);
    this.productService.update(formData, this.id);
    this.setCloseModal();
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
}

import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { CommonModule } from '@angular/common';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryForm: FormGroup
  categories: Category[] = []

  faTrashCan = faTrashCan;
  faPencil = faPencil;

  constructor(private categoryService: CategoriesService, private loginService: LoginService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response
      },
      error: (error) => {
        console.error('Erro ao obter categorias:', error);
      }
    });
  }

  createCategory() {
    const storeId = this.loginService.getStoreId()

    if (!storeId) {
      console.error('Store ID não encontrado!');
      return;
    }
    
    const category: Category = {
      name: this.categoryForm.get('name')?.value,
      storeId
    };

    this.categoryService.createCategory(category);
  }
}

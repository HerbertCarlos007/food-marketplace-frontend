import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryForm: FormGroup

  constructor(private categoryService: CategoriesService, private loginService: LoginService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  createCategory() {
    const storeId = this.loginService.getStoreId()

    if (!storeId) {
      console.error('Store ID não encontrado!');
      return;
    }

    console.log('olaa', this.categoryForm.get('name')?.value)
    
    const category: Category = {
      name: this.categoryForm.get('name')?.value,
      storeId
    };

    this.categoryService.createCategory(category);
  }
}

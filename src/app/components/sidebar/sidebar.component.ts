import { Component } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faChevronRight = faChevronRight;
  categories: Category[] = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {

    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response
      },
      error: (error) => {
        console.error('Erro ao obter a categoria:', error);
      }
    });
  }
}

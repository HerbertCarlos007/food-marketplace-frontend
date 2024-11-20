import { Component } from '@angular/core';
import { ConfigurationSidebarComponent } from '../configuration-sidebar/configuration-sidebar.component';
import { ProductManagementComponent } from '../product-management/product-management.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { CategoriesComponent } from "../categories/categories.component";

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, ConfigurationSidebarComponent, ProductManagementComponent, UsersComponent, CategoriesComponent, CategoriesComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  activeComponent: string = 'products'

  onOptionSelected(option: string) {
    this.activeComponent = option
  }
}

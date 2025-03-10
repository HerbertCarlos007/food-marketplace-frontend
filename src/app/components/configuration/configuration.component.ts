import { Component } from '@angular/core';
import { ConfigurationSidebarComponent } from '../configuration-sidebar/configuration-sidebar.component';
import { ProductManagementComponent } from '../product-management/product-management.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../users/users.component';
import { CategoriesComponent } from "../categories/categories.component";
import { AppearanceComponent } from '../appearance/appearance.component';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, ConfigurationSidebarComponent, ProductManagementComponent, UsersComponent, CategoriesComponent, CategoriesComponent, AppearanceComponent, DashboardComponent, DashboardComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  activeComponent: string = 'sales'

  onOptionSelected(option: string) {
    this.activeComponent = option
  }
}

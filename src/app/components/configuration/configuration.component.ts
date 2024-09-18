import { Component } from '@angular/core';
import { ConfigurationSidebarComponent } from '../configuration-sidebar/configuration-sidebar.component';
import { ProductManagementComponent } from '../product-management/product-management.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, ConfigurationSidebarComponent, ProductManagementComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {
  activeComponent: string | null = null;

  onOptionSelected(option: string) {
    this.activeComponent = option
  }
}

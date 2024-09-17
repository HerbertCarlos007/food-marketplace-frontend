import { Component } from '@angular/core';
import { ConfigurationSidebarComponent } from '../configuration-sidebar/configuration-sidebar.component';
import { ProductManagementComponent } from '../product-management/product-management.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [ConfigurationSidebarComponent, ProductManagementComponent],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {

}

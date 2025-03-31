import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { ProductsComponent } from '../products/products.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  searchProduct: string = ''

   constructor(private loginService: LoginService) {
    
    }

  ngOnInit() {
    // const subdomain =
    //   window.location.hostname.split('.')[0] === 'localhost'
    //     ? 'dev'
    //     : window.location.hostname.split('.')[0];
    // this.loginService.getBySubdomain(subdomain);
    // this.setSecondaryColorFromLocalStorage();
  }

  setSecondaryColorFromLocalStorage() {
    const customFields = JSON.parse(localStorage.getItem('customFields') || '');
    const secondaryColor = customFields[0]?.secondary_color;
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faHouse = faHouse
  faCartShopping = faCartShopping
  faMagnifyingGlass = faMagnifyingGlass
  faGear = faGear
  faRightFromBracket = faRightFromBracket
  role = ''
  
  searchProduct: string = ''
  @Output() searchProductChange = new EventEmitter<string>()

  search(e: Event): void {
    const target = e.target as HTMLInputElement
    this.searchProduct = target.value
    this.searchProductChange.emit(this.searchProduct)
  }

  constructor(private userService: UsersService, private loginService: LoginService,  private router: Router) {
    this.role = this.userService.getUserRole();
    // this.setPrimaryColorFromLocalStorage();
  }

  logout() {
    this.loginService.logout()
  }

  navigateToCart() {
    this.router.navigate(['/cart'])
  }

    setPrimaryColorFromLocalStorage() {
      const customFields = JSON.parse(localStorage.getItem('customFields') || '');
      const primaryColor = customFields[0]?.primary_color;
      document.documentElement.style.setProperty('--primary-color', primaryColor);
    }

}
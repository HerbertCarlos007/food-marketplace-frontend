import { Component } from '@angular/core';
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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, CommonModule],
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

  constructor(private userService: UsersService, private loginService: LoginService) {
    this.role = this.userService.getUserRole();
  }

  logout() {
    this.loginService.logout()
  }

}
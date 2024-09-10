import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginForm = true
  email: string = ''
  name: string = ''
  password: string = ''


  constructor(private loginService: LoginService) {}

  ngOnInit() {
    const subdomain = window.location.hostname.split(".")[0] === 'localhost' ? 'dev' : window.location.hostname.split(".")[0]
    this.loginService.getBySubdomain(subdomain)
  }
  
  changeForm() {
    this.isLoginForm = !this.isLoginForm;
  }


  login() {
    const user: User = {
      email: this.email,
      password: this.password
    };
    this.loginService.login(user)
  }

  register() {
    const user: User = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    this.loginService.register(user)
  }
}

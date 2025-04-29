import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../interfaces/user';
import { LoginService } from '../../services/login.service';
import { Store } from '../../interfaces/store';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.getStoreBySubdomain()
  }

  getStoreBySubdomain() {
    const subdomain =
      window.location.hostname.split('.')[0] === 'localhost'
        ? 'dev'
        : window.location.hostname.split('.')[0];

    this.loginService.getBySubdomain(subdomain).subscribe({
      next: (store: Store) => {
        console.log('Loja carregada:', store);
      },
      error: (error: any) => {
        console.error('Erro ao carregar loja:', error);
      },
    });
  }

  login() {
    const user: User = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.loginService.login(user);
  }
}

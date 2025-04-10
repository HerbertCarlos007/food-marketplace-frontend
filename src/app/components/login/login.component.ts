import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';
import { AppearanceComponent } from '../appearance/appearance.component';
import { AppearanceService } from '../../services/appearance.service';
import { CustomField } from '../../interfaces/customField';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginForm = true;

  constructor(
    private loginService: LoginService,
    private appearanceService: AppearanceService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.getCustomFields()
  }

  changeForm() {
    this.isLoginForm = !this.isLoginForm;
  }

  getErrorLoginForm(controlName: string): string | null {
    const control = this.loginForm.get(controlName);

    if (control?.invalid && control?.touched) {
      if (control.errors?.['email']) {
        return 'E-mail inválido.';
      }
      if (control.errors?.['minlength']) {
        return `A senha deve ter pelo menos 6 caracteres.`;
      }
    }

    return null;
  }

  getErrorRegisterForm(controlName: string): string | null {
    const control = this.registerForm.get(controlName);

    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) {
        return 'Este campo é obrigatório.';
      }
      if (control.errors?.['email']) {
        return 'E-mail inválido.';
      }
      if (control.errors?.['minlength']) {
        return `A senha deve ter pelo menos 6 caracteres.`;
      }
    }

    return null;
  }

  login() {
    const user: User = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.loginService.login(user);
  }

  register() {
    const storeId = this.loginService.getStoreId();

    if (!storeId) {
      console.error('Store ID não encontrado!');
      return;
    }

    if (this.registerForm.invalid) {
      return;
    }

    const user: User = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      role: 'usuario',
      status: 'ativo',
      storeId: storeId,
      password: this.registerForm.get('password')?.value,
    };
    this.loginService.register(user);
  }

  getCustomFields() {
    const storeId = this.loginService.getStoreId();

    if (!storeId) {
      console.error('Store ID não encontrado!');
      return;
    }

    this.appearanceService.getCustomFields(storeId).subscribe({
      next: (response) => {
        localStorage.setItem('customFields', JSON.stringify(response));
      },
      error: (error) => {
        console.error('Erro ao obter os campos customizados', error);
      },
    });
  }
}

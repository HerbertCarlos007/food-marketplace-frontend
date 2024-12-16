import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ModalComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  faPencil = faPencil;
  faPlus = faPlus;
  users: User[] = [];

   userForm: FormGroup

  isModalOpen: boolean = false;
  isModalCreateUserOpen: boolean = false;

  constructor(private userService: UsersService, private loginService: LoginService, private fb: FormBuilder) {
     this.userForm = fb.group({
       name: ['', Validators.required],
       email: ['', Validators.required],
       password: ['', Validators.required],
     });
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  setCloseModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  setCloseModalCreateUser(){
    this.isModalCreateUserOpen = !this.isModalCreateUserOpen
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.error('Erro ao obter usuarios:', error);
      },
    });
  }

  register() {
    const storeId = this.loginService.getStoreId();

    if (!storeId) {
      console.error('Store ID não encontrado!');
      return;
    }


    const user: User = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      role: 'administrador',
      status: 'ativo',
      storeId: storeId,
      password: this.userForm.get('password')?.value,
    };
    this.loginService.register(user);
  }
}

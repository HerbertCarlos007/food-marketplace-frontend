import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css',
})
export class StoresComponent {

  stores: Store[] = []
  
  constructor(private storeService: StoreService, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.getAllStores();
  }

  getAllStores() {
    this.storeService.getAllStores().subscribe({
      next: (response) => {
        this.stores = response;
      },
      error: (error) => {
        console.error('Erro ao obter lojas:', error)
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login'])
  }

  navigateToCreateStore() {
    this.router.navigate(['/create-store'])
  }

  navigateToStoreSelected(store: Store): void {
    this.loginService.getBySubdomain(store.subdomain.trim()).subscribe({
      next: () => {
        const subdomain = store.subdomain.trim();
        const url = `http://${subdomain}.localhost:4200/home`;
        window.location.href = url;
      },
      error: (error) => {
        console.error('Erro ao buscar subdomínio:', error);
      },
    });
  }
  
}

import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../../interfaces/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css',
})
export class StoresComponent {

  stores: Store[] = []
  
  constructor(private storeService: StoreService) {}

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

  navigateToStoreSelected(store: Store): void {
    const subdomain = store.subdomain.trim()
    const url = `http://${subdomain}.localhost:4200`
    window.location.href = url
  }
  
}

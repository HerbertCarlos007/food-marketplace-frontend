import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Product} from '../interfaces/product'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseApiUrl = environment.baseApiUrl;
  token = localStorage.getItem('token'); 

  constructor(private http: HttpClient) {}

  create(formData: FormData) {
  

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const apiUrl = `${this.baseApiUrl}api/product`;
    return this.http.post<Product>(apiUrl, formData, { headers }).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('register failed:', error);
      },
    });
  }

  getAllProducts(storeId: string): Observable<Product[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const apiUrl = `${this.baseApiUrl}api/product/${storeId}`;
    return this.http.get<Product[]>(apiUrl, { headers }).pipe(
      map((response: Product[]) => response)
    )
  }

  update(formData: FormData, id: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    const apiUrl = `${this.baseApiUrl}api/product/${id}`;
    return this.http.put<Product>(apiUrl, formData, { headers }).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('register failed:', error);
      },
    });
  }
}

    


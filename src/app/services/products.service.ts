import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Product} from '../interfaces/product'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  create(formData: FormData) {
    const token = localStorage.getItem('token'); 
    console.log(token)

    // Adiciona o token no cabeçalho da requisição
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = `${this.baseApiUrl}api/product`;
    return this.http.post<Product>(apiUrl, formData, { headers }).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('register failed:', error);
      },
    });
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments-example';
import { HttpClient } from '@angular/common/http';
import { Store } from '../interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class CreateStoreService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  create(formData: FormData) {
      const apiUrl = `${this.baseApiUrl}api/store`;
      return this.http.post<Store>(apiUrl, formData).subscribe({
        next: (response) => {},
        error: (error) => {
          console.error('register failed:', error);
        },
      });
    }
}

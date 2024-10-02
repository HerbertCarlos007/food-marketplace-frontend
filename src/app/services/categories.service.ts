import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseApiUrl = environment.baseApiUrl;
  token = localStorage.getItem('token'); 

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    const apiUrl = `${this.baseApiUrl}api/category`;
    return this.http.get<Category[]>(apiUrl, { headers }).pipe(
      map((response: Category[]) => response)
    )
  }
}

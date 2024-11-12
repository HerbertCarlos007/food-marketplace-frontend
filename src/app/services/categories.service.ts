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
  
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    const apiUrl = `${this.baseApiUrl}api/category`;
    return this.http.get<Category[]>(apiUrl).pipe(
      map((response: Category[]) => response)
    )
  }
}

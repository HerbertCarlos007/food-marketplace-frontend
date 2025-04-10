import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Store } from '../interfaces/store';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User) {
    const apiUrl = `${this.baseApiUrl}auth/login`;
    return this.http.post<User>(apiUrl, user).subscribe({
      next: (response) => {
        localStorage.setItem('token', String(response.token));
        localStorage.setItem('role', String(response.role));
        this.router.navigate(['/home'])

        if (response.role === 'administrador') {
          this.router.navigate(['/home'])
        }else {
          this.router.navigate(['/'])
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }

  register(user: User) {
    const apiUrl = `${this.baseApiUrl}auth/register`;
    return this.http.post<User>(apiUrl, user).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('register failed:', error);
      },
    });
  }

  getBySubdomain(subdomain: string): Observable<Store> {
    const apiUrl = `${this.baseApiUrl}api/store/${subdomain}`;
    return this.http.get<Store>(apiUrl).pipe(
      tap((data: Store) => {
        localStorage.setItem('store_id', data.id);
      })
    );
  }
  

  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  getStoreId() {
   const storeId = localStorage.getItem('store_id')
   return storeId
  }

  getToken() {
    const token = localStorage.getItem('token')
    return token
  }

}

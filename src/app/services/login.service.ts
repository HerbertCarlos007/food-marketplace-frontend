import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Store } from '../interfaces/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
        this.router.navigate(['/home'])
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

  getBySubdomain(subdomain: string) {
    const apiUrl = `${this.baseApiUrl}api/store/${subdomain}`
    this.http.get<Store>(apiUrl).subscribe({
      next: (data: Store) => {
        console.log(data.id)
       localStorage.setItem('store_id', data.id)
      },
      error: (error) => {
        console.error('Não foi possivel encontrar o subdominio', error)
      },
    });
  }

}

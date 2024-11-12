import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseApiUrl = environment.baseApiUrl;
  role = localStorage.getItem('role') || ''
  
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    const apiUrl = `${this.baseApiUrl}api/user`;
    return this.http.get<User[]>(apiUrl).pipe(
      map((response: User[]) => response)
    )
  }

  getUserRole(): string {
    return this.role
  }
}

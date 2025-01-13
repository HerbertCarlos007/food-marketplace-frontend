import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '../interfaces/store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

   getAllStores(): Observable<Store[]> {
      const apiUrl = `${this.baseApiUrl}api/store`;
      return this.http.get<Store[]>(apiUrl).pipe(
        map((response: Store[]) => response)
      )
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { CustomField } from '../interfaces/customField';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppearanceService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  create(formData: FormData) {
    const apiUrl = `${this.baseApiUrl}api/customField`;
    return this.http.post<CustomField>(apiUrl, formData).subscribe({
      next: (response) => {},
      error: (error) => {
        console.error('register custom field failed', error);
      },
    });
  }

  getCustomFields(storeId: string): Observable<CustomField[]> {
    const apiUrl = `${this.baseApiUrl}api/customField/${storeId}`
    return this.http.get<CustomField[]>(apiUrl).pipe(
      map((response: CustomField[]) => response)
    )
  }
}

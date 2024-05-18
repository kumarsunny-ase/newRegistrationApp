import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  // Fetch industries from the server
  getIndustries(): Observable<string[]> {
    return this.http.get<string[]>(
      'http://localhost:5276/api/Registration/industries'
    );
  }

  // Check if the provided username already exists
  checkUserName(username: string): Observable<boolean> {
    return this.http.get<boolean>(
      `http://localhost:5276/api/Registration/userName?username=${username}`
    );
  }

  // Submit user registration data to the server
  submitData(formData: any) {
    return this.http.post<any>(
      'http://localhost:5276/api/Registration/summary',
      formData
    );
  }
}

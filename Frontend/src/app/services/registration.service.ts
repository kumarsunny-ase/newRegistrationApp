import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  getIndustries(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:7019/api/Registration');
  }
}

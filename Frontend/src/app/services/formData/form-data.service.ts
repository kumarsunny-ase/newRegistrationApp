import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  formData: any = {}; // Object to store form data
  constructor() {}
}

import { Component } from '@angular/core';
import { user } from '../models/user.model';
import { RegistrationService } from '../services/registration/registration.service';
import { Router } from '@angular/router';
import { FormDataService } from '../services/formData/form-data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent {
  model!: user;

  constructor(
    private apiService: RegistrationService,
    private router: Router,
    private formDataService: FormDataService
  ) {
    this.model = {
      name: '',
      firstName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onFormSubmit() {
    this.formDataService.formData.user = this.model;
    this.router.navigate(['/summary']);
    console.log(this.formDataService);
  }
  goBack() {
    
  }
}

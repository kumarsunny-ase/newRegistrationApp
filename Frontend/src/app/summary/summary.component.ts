import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../services/formData/form-data.service';
import { RegistrationService } from '../services/registration/registration.service';
import { Router } from '@angular/router';
import { summary } from '../models/summary.model';
import { user } from '../models/user.model';
import { company } from '../models/company.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  model: summary = {
    companyName: '',
    industry: '',
    name: '',
    firstName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsOfServices: false,
  };
  formData: any;
  formSubmitted: boolean = false;
  constructor(
    private formDataService: FormDataService,
    private apiService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formData = this.formDataService.formData;
    const userFormData: user = this.formData.user;
    const companyFormData: company = this.formData.company;

    this.model = {
      ...this.model,
      companyName: companyFormData.name,
      industry: companyFormData.industry,
      name: userFormData.name,
      firstName: userFormData.firstName,
      userName: userFormData.userName,
      email: userFormData.email,
      password: userFormData.password,
      confirmPassword: userFormData.confirmPassword,
    };
  }

  saveData() {
    this.formSubmitted = true;
    if (this.model.termsOfServices) {
      console.log(this.model);
      this.apiService.submitData(this.model).subscribe(
        (response) => {
          // Handle response from API
          console.log(response);
        },
        (error) => {
          // Handle error
          console.error(error);
        }
      );
    } else {
      // Notify user that the checkbox is mandatory
      alert('Mandatory Field: Please accept the terms and conditions.');
    }
  }

  goBack() {
    this.router.navigate(['/user']);
  }
}
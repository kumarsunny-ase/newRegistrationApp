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
  // Define model for summary
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
  dataSaved: boolean = false;
  responseData: any = {};
  constructor(
    private formDataService: FormDataService,
    private apiService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form data from from service
    this.formData = this.formDataService.formData;
    // Extract user and company data from form data
    const userFormData: user = this.formData.user;
    const companyFormData: company = this.formData.company;

    // Populate summary model with form data
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

  // Save summary data
  saveData() {
    // Set form submitted flag to true
    this.formSubmitted = true;
    // Check if terms of services are accepted
    if (this.model.termsOfServices) {
      // Call API service to submit data
      this.apiService.submitData(this.model).subscribe(
        // Handle success response
        (response: any) => {
          // Set data saved flag to true
          this.responseData = response.message;
          // Set data saved flag to true
          this.dataSaved = true;
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

  // Navigate back to user Page
  goBack() {
    this.router.navigate(['/user']);
  }

  //Navigate to the home page
  backToHome() {
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}

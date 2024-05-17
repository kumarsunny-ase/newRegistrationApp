import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { company } from '../models/company.model';
import { FormDataService } from '../services/formData/form-data.service';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css'],
})
export class CompanyDataComponent implements OnInit {
  // Declare model for company
  model!: company;
  registrationForm!: FormGroup;
  industries: string[] = [];

  constructor(
    private apiService: RegistrationService,
    private router: Router,
    private formDataService: FormDataService,
    private formBuilder: FormBuilder
  ) {
    // Initialize model with default values
    this.model = {
      name: '',
      industry: '',
    };
  }

  ngOnInit(): void {
    // Fetch industries data
    this.fetchIndustries();
    // Initialize registration form with validation rules
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      industry: ['', Validators.required],
    });
    // Populate form with existing company data if available
    if (this.formDataService.formData.company) {
      this.model = this.formDataService.formData.company;
    }
  }

  // Fetch industries data from API
  fetchIndustries() {
    this.apiService.getIndustries().subscribe((data: any[]) => {
      // Extract industry names from API response
      this.industries = data.map((item) => item.industryName);
    });
  }

  // Handle form submission
  onFormSubmit() {
    // Check if form is valid
    if (this.registrationForm.valid) {
      // Save company data to form data service
      this.formDataService.formData.company = this.model;
      // Navigate to user page
      this.router.navigate(['/user']);
    } else {
      // Notify user that the checkbox is mandatory
      alert('Please fill up the blanks.');
    }
  }
}

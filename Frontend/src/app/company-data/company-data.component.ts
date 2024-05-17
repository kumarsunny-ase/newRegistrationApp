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
  model!: company;
  registrationForm!: FormGroup;
  industries: string[] = [];

  constructor(
    private apiService: RegistrationService,
    private router: Router,
    private formDataService: FormDataService,
    private formBuilder: FormBuilder
  ) {
    this.model = {
      name: '',
      industry: '',
    };
  }

  ngOnInit(): void {
    this.fetchIndustries();
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      industry: ['', Validators.required],
    });
    if (this.formDataService.formData.company) {
      this.model = this.formDataService.formData.company;
    }
  }

  fetchIndustries() {
    this.apiService.getIndustries().subscribe((data: any[]) => {
      this.industries = data.map((item) => item.industryName);
    });
  }

  onFormSubmit() {
    if (this.registrationForm.valid) {
      this.formDataService.formData.company = this.model;
      this.router.navigate(['/user']);
    } else {
      // Notify user that the checkbox is mandatory
      alert('Please fill up the blanks.');
    }
  }
}

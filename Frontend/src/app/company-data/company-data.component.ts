import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration/registration.service';
import { FormGroup } from '@angular/forms';
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

  constructor(private apiService: RegistrationService, private router: Router, private formDataService: FormDataService) {
    this.model = {
      name: '',
      industry: '',
    };
  }

  ngOnInit(): void {
    this.fetchIndustries();
     if (this.formDataService.formData.company) {
       this.model = this.formDataService.formData.company;
     }
  }
  fetchIndustries() {
    this.apiService.getIndustries().subscribe((data: any[]) => {
      this.industries = data.map((item) => item.industry);
    });
  }

  onFormSubmit() {
    console.log(this.model);
    this.formDataService.formData.company = this.model
    this.router.navigate(['/user']);
    console.log(this.formDataService.formData)
  }
}

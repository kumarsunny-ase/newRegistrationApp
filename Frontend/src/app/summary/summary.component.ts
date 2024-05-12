import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../services/formData/form-data.service';
import { RegistrationService } from '../services/registration/registration.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  formData: any;

  constructor(
    private formDataService: FormDataService,
    private apiService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.formData = this.formDataService.formData;
    console.log(this.formData);
  }

  saveData() {
    this.apiService.submitData(this.formData).subscribe(
      (response) => {
        // Handle response from API
        console.log(response);
      },
      (error) => {
        // Handle error
        console.error(error);
      }
    );
  }

  goBack() {
    
  }
}

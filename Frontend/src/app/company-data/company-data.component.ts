import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-data',
  templateUrl: './company-data.component.html',
  styleUrls: ['./company-data.component.css']
})
export class CompanyDataComponent implements OnInit{
  name: any = {};
  industries: string[] = [];

  constructor(private apiService: RegistrationService, private router: Router) {}

  ngOnInit(): void {
    this.fetchIndustries();
  }
  fetchIndustries() {
    this.apiService.getIndustries().subscribe((data: any[]) => {
      this.industries = data.map(item=> item.industry);
      console.log(data)
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { user } from '../models/user.model';
import { RegistrationService } from '../services/registration/registration.service';
import { Router } from '@angular/router';
import { FormDataService } from '../services/formData/form-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit{
  model!: user;
  userForm!: FormGroup

  constructor(
    private apiService: RegistrationService,
    private router: Router,
    private formDataService: FormDataService,
    private formBuilder: FormBuilder
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
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
    if(this.formDataService.formData.user) {
      this.model = this.formDataService.formData.user
    }
  }

  validatePassword() {
    const password = this.userForm.get('password')?.value;
    const confirmPassword = this.userForm.get('confirmPassword')?.value;
    if(password !== confirmPassword) {
      this.userForm.get('confirmPassword')?.setErrors({mismatch: true});
    }
    else {
      this.userForm.get('confirmPassword')?.setErrors(null);
    }
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      this.formDataService.formData.user = this.model;
      this.router.navigate(['/summary']);
    } else {
      alert('Please fill up the blanks.');
    }
  }
  goBack() {
    this.router.navigate(['']);
  }
}

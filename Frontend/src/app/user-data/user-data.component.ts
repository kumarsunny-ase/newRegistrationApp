import { Component, OnInit } from '@angular/core';
import { user } from '../models/user.model';
import { RegistrationService } from '../services/registration/registration.service';
import { Router } from '@angular/router';
import { FormDataService } from '../services/formData/form-data.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
})
export class UserDataComponent implements OnInit {
  // Declare model for user
  model!: user;
  userForm!: FormGroup;
  showPassword: boolean = false; // Flag to toogle password visibility
  showConfirmPassword: boolean = false; // Flag to toogle confirm password visibility

  constructor(
    private apiService: RegistrationService,
    private router: Router,
    private formDataService: FormDataService,
    private formBuilder: FormBuilder
  ) {
    // Initialize model with default values
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
    // Initialize user form with validation rules
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      userName: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [uniqueUsernameValidator(this.apiService)],
          updateOn: 'blur',
        },
      ],
      email: '',
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    if (this.formDataService.formData.user) {
      this.model = this.formDataService.formData.user;
    }
  }

  // Method to toggle password visibility
  togglePasswordVisibility(fieldName: string) {
    if(fieldName === 'password') {
      this.showPassword = !this.showPassword;
    } else if (fieldName === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword
    }
  }

  // Validate password and confirm password fields
  validatePassword() {
    const password = this.userForm.get('password')?.value;
    const confirmPassword = this.userForm.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      this.userForm.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      this.userForm.get('confirmPassword')?.setErrors(null);
    }
  }

  // Handle form submission
  onFormSubmit() {
    // Check if form is valid
    if (this.userForm.valid) {
      // Save user data to form data service
      this.formDataService.formData.user = this.model;
      // Navigate to summary page
      this.router.navigate(['/summary']);
    } else {
      // Notify user if form is invalid
      alert('Please fill up the blanks.');
    }
  }

  // Navigate back to home page
  goBack() {
    this.router.navigate(['']);
  }
}

// Async validator for checking unique username
export function uniqueUsernameValidator(
  apiService: RegistrationService
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{ [key: string]: any } | null> => {
    const username = control.value;
    return apiService.checkUserName(username).pipe(
      map((res) => (res ? { usernameExists: true } : null)),
      catchError(() => of(null))
    );
  };
}

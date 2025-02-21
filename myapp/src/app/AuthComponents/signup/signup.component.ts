import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatError, MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { CanComponentDeactivate, CanDeactivateGuard } from '../../Guards/AuthGuards/can-deactivate';

// Custom Password Match Validator
function passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    HttpClientModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements CanComponentDeactivate{
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        role: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  canDeactivate(): boolean {
    if (this.signupForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
  // Password match validator
  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  // Handle form submission
  onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      this.http.post('https://localhost:44352/api/Account/register', signupData)
        .pipe(
          catchError(error => {
            console.error('Error during signup:', error);
            alert('Something went wrong during signup. Please try again.');
            return of(null); // Return an empty observable to prevent breaking the flow
          })
        )
        .subscribe(response => {
          if (response) {
            console.log('Signup successful:', response);
            // Redirect to login page on successful signup
            this.router.navigate(['/login']);
          }
        });
    } else {
      console.log('Form is not valid or passwords do not match');
    }
  }

  // Getters for form controls
  get fullName(): FormControl {
    return this.signupForm.get('fullName') as FormControl;
  }

  get email(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  get role(): FormControl {
    return this.signupForm.get('role') as FormControl;
  }
}

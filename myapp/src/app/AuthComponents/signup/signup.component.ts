import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
// Custom Password Match Validator
function passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
}
@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [MatFormField,
    CommonModule,
    MatInput,
    ReactiveFormsModule,
    MatButtonModule,
    MatError,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatLabel,
  HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private http:HttpClient){
    this.signupForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      fname:['',[Validators.required]],
      lname:['',[Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Assuming a 10-digit phone number
      address: ['', [Validators.required]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
    },
    {
      validators: this.passwordMatchValidator
    }
  );
  }
  // Password match validator
  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  }
  
  
  

   // Handle form submission
   onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      this.http.post('https://localhost:7033/api/Login/signup', signupData)
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

  get email(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get fname(): FormControl {
    return this.signupForm.get('fname') as FormControl;
  }

  get lname(): FormControl {
    return this.signupForm.get('lname') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.signupForm.get('phoneNumber') as FormControl;
  }

  get address(): FormControl {
    return this.signupForm.get('address') as FormControl;
  }

  get password(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.signupForm.get('confirmPassword') as FormControl;
  }
}

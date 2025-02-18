import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient to make requests
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatError, MatFormFieldModule, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import users from '../../assets/users.json'
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/authservice';
import { User } from '../../Models/User';
import { AuthenticateService } from '../../Services/authenticate.service';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,MatFormFieldModule,MatError,MatIcon,MatLabel,HttpClientModule,MatInputModule,MatInput,MatButton,MatButtonModule,MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // users:{email:string,password:string}[]=users;
  loginForm: FormGroup;  
  hide: boolean = true;  
  message: string = '';  

  private apiUrl="https://localhost:7033/api/Login/login";

  constructor(private fb: FormBuilder, private http: HttpClient, private cd: ChangeDetectorRef,private router:Router) {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
    })
  }

  // Method to handle login form submission
  submitLogin(): void {
   if(this.loginForm.invalid){
    this.message='Please fill the form correctly';
    return;
   }
   const{email,password}=this.loginForm.value;
  //  const user=this.users.find((u) => u.email === email && u.password === password);
  const user:User={email,password};

   //1
  // this.auth.login(user).subscribe(
  //   (res)=>{
  //     this.message='Login Successful';
  //     this.router.navigate(['/dashboard']);
  //   },
  //   (error)=>{
  //     this.message="Invalid email or password";
  //   }
  // )

  //2
  //  if(user){
  //   this.message='Login Successful';
  //   alert('Login Successful');

  //   this.router.navigate(['/dashboard']);
  //  }
  //  else{
  //   this.message='Invalid email or password';
  //  }

  //3
  //  this.http.post(`${this.apiUrl}`,{email,password})
  //  .subscribe(
  //   (res)=>{
  //     this.message='Login Successful';
  //     alert('Login Successful');
  //     this.router.navigate(['/dashboard']);
  //   },
  //   (error)=>{
  //     this.message='Invalid email or password';
  //     console.error('Login error',error);
  //   }
  //  )
  this.http.post(`${this.apiUrl}`, { email, password })
   .subscribe(
    (res) => {
      this.message = 'Login Successful';
      alert('Login Successful');
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      if (error.status === 401) {
        this.message = 'Invalid email or password';
      } else {
        this.message = 'An unexpected error occurred';
      }
      console.error('Login error', error);
    }
   );


  //4
  // this.http.post<any>(`${this.apiUrl}`, { email, password }).subscribe(
  //   (res) => {
  //     this.message = 'Login Successful';
  //     alert('Login Successful');
  //     this.router.navigate(['/dashboard']);
  //   },
  //   (error) => {
  //     // Display the error message from the server response (if available)
  //     if (error.error && error.error.title) {
  //       this.message = error.error.title;  // Assuming backend provides a title for error
  //     } else {
  //       this.message = 'Invalid email or password';
  //     }
  //     console.error('Login error', error);
  //   }
  // );
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
    this.cd.detectChanges(); 
  }
}

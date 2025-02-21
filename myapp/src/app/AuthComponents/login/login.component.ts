import { Component, ChangeDetectorRef, inject } from '@angular/core';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,MatFormFieldModule,MatError,MatIcon,MatLabel,HttpClientModule,MatInputModule,MatInput,MatButton,MatButtonModule,MatIconModule,MatSnackBarModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // users:{email:string,password:string}[]=users;
  loginForm: FormGroup;  
  hide: boolean = true;  
  message: string = ''; 
  
  private _snackbar=inject(MatSnackBar);

  private apiUrl='https://localhost:44352/api/Account/login';

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
  //------------WORKING_______________
  // this.http.post(`${this.apiUrl}`, { email, password })
  //  .subscribe(
  //   (res) => {
  //     this.message = 'Login Successful';
  //     // alert('Login Successful');
  //     this.openSnackBar('Login Successful','Close');
  //     this.router.navigate(['/dashboard']);
  //   },
  //   (error) => {
  //     if (error.status === 401) {
  //       this.message = 'Invalid email or password';
  //     } else {
  //       this.message = 'An unexpected error occurred';
  //     }
  //     console.error('Login error', error);
  //   }
  //  );

  this.http.post<{ message: string, token: string }>(`${this.apiUrl}`, { email, password })
  .subscribe(
    (res) => {
      // If login is successful, display the success message
      this.message = 'Login Successful';
      this.openSnackBar('Login Successful', 'Close');

      // Store the JWT token in localStorage
      localStorage.setItem('jwtToken', res.token);

      // Navigate to the dashboard after successful login
      this.router.navigate(['/dashboard']);
    },
    (error) => {
      // Handle error based on the error status code
      if (error.status === 401) {
        this.message = 'Invalid email or password';
      } else {
        this.message = 'An unexpected error occurred';
      }
      
      // Log the error details for debugging
      console.error('Login error', error);
      
      // Optionally show an error snack bar
      this.openSnackBar(this.message, 'Close');
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

  openSnackBar(message:string,action:string):void{
    this._snackbar.open(message,action,{
      duration:4000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass:['success-message']
    })
  }
}

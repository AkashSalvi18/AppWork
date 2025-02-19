import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-edituserbox',
  imports: [CommonModule,MatFormFieldModule,ReactiveFormsModule,HttpClientModule,MatFormField,MatInputModule,MatButtonModule],
  templateUrl: './edituserbox.component.html',
  styleUrl: './edituserbox.component.css'
})
export class EdituserboxComponent {

  userForm!:FormGroup;
  private _snackBar=inject(MatSnackBar);
  constructor(
    public dialogRef: MatDialogRef<EdituserboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      email: [{ value: data.email, disabled: true }],
      password: [data.password, [Validators.required, Validators.minLength(6)]],
    });
  }
  // onSubmit(): void {
  //   if (this.userForm.valid) {
  //     const updatedUser = { id: this.data.id, ...this.userForm.value };
  //     this.http.put(`https://localhost:7033/api/Login/update/${this.data.id}`, updatedUser).subscribe(response => {
  //       console.log('User updated:', response);
  //       this.dialogRef.close(true);
  //     });
  //   }
  // }
  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = {
        email: this.data.email,
        password: this.userForm.value.password
      };

      this.http.put(`https://localhost:7033/api/Login/update/${this.data.id}`, updatedUser).subscribe({
        next: () => {
          // alert('User updated successfully!');
          this._snackBar.open("User Updated Successfully","Close");
          setTimeout(()=>{
            this.dialogRef.close(true);
          },3000)
          
        },
        error: (error) => {
          console.error('Update failed:', error);
          this.openSnackBar(`Update failed: ${error.status} - ${error.statusText}`, 'Close');
          // alert(`Update failed: ${error.status} - ${error.statusText}`);
        }
      });
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.dialogRef.afterClosed().subscribe(() => {
      window.location.reload();
    });
  }

  openSnackBar(message:string,action:string):void{
    this._snackBar.open(message,action,{
      duration:40000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass:['success-snackbar']
    });
  }
}

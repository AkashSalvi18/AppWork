import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatHeaderCellDef, MatTableDataSource, MatTableModule } from '@angular/material/table';
import{MatDialog} from '@angular/material/dialog'
import { EdituserboxComponent } from '../../DialogBoxes/User/edituserbox/edituserbox.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CdkTableModule } from '@angular/cdk/table';
// import {ResUser} from '../../Models/ResUser'

@Component({
  selector: 'app-usersgrid',
  standalone:true,
  imports: [MatButtonModule,
    MatIcon,
    HttpClientModule,
    CommonModule,
    MatPaginator,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatSort,
    MatSortModule,
    MatFormFieldModule,
  MatHeaderCellDef,
MatHeaderCellDef,
CdkTableModule],
  templateUrl: './usersgrid.component.html',
  styleUrl: './usersgrid.component.css'
})


export class UsersgridComponent implements OnInit{

  displayedColumns:string[]=['id','email','fullName','actions'];
  dataSource=new MatTableDataSource<any>();
  filterValue:string='';
  private _snackbar=inject(MatSnackBar);
  
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort)sort!:MatSort;
  constructor(private http:HttpClient,private dialog:MatDialog){}

  ngOnInit(): void {
    this.refreshData();
  }

// Filter method
applyFilter(): void {
  this.dataSource.filter = this.filterValue.trim().toLocaleLowerCase();
}

 // Set paginator and sorting
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  // Open edit dialog
  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(EdituserboxComponent, {
      width: '400px',
      data: { ...user },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser(result);
      }
    });
  }

   // Update user API
   updateUser(user: any): void {
    this.http.put(`https://localhost:44352/api/Account/update/${user.id}`, user)
      .subscribe(response => {
        console.log('User updated:', response);
        this.refreshData();
      });
  }

  // Delete user API
  // deleteUser(user: any): void {
  //   this.http.delete(`https://localhost:7033/api/Login/delete/${user.id}`)
  //     .subscribe(response => {
  //       console.log('User deleted:', response);
  //       this.refreshData();
  //       this.openSnackBar('User deleted successfullt','Close');
  //     });
  // }
  deleteUser(user: any): void {
    this.http.delete(`https://localhost:7033/api/Account/delete/${user.id}`)
      .subscribe({
        next: () => {
          console.log('User deleted:', user);
          this.refreshData();
          this.openSnackBar('User deleted successfully!', 'Close'); // Show success snackbar
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.openSnackBar('Failed to delete user.', 'Close'); // Show error snackbar
        }
      });
  }
  
  refreshData(): void {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<any>('https://localhost:44352/api/Account/users', { headers })
        .subscribe({
          next: (data) => {
            console.log("Received Data", data);
            this.dataSource.data = data;
          },
          error: (error) => {
            console.error('Error fetching data', error);
            this.openSnackBar('Failed to load users', 'Close');
            if (error.status === 401) {
              this.openSnackBar('You are not authorized. Please log in.', 'Close');
            }
          }
        });
    } else {
      this.openSnackBar('No token found. Please log in.', 'Close');
    }
  }
  // refreshData(): void {
  //   const token = localStorage.getItem('jwtToken');
    
  //   if (token) {
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
  //     this.http.get<any[]>('https://localhost:44352/api/Account/users', { headers })
  //       .subscribe(data => {
  //         console.log("Received Data", data);
  //         this.dataSource.data = data;
  //       }, error => {
  //         if (error.status === 401) {
  //           console.error('Unauthorized, redirecting to login');
  //           this.openSnackBar('You are not authorized. Please log in.', 'Close');
  //           // Redirect to login page
  //         } else {
  //           console.error('Error fetching data', error);
  //           this.openSnackBar('Failed to load users', 'Close');
  //         }
  //       });
  //   } else {
  //     console.error('No token found');
  //     this.openSnackBar('You need to log in first', 'Close');
  //   }
  // }
  
  // Refresh the user grid data
  // refreshData(): void {
  //   const token=localStorage.getItem('jwtToken');
  //   if(token){
  //     const headers=new HttpHeaders().set('Authorization',`Bearer${token}`);
  //     this.http.get<any[]>('https://localhost:44352/api/Account/users',{headers})
  //     .subscribe(data => {
  //       console.log("Received Data",data)
  //       this.dataSource.data = data;
  //     },
  //     error=>{
  //       console.error('Error fetching data',error);
  //       this.openSnackBar("Error Fetching Data",'Close');
  //     }
  //   );
  //   }
  //   else{
  //     console.error('No token found');
  //     this.openSnackBar('Login first','Close');
  //   }
    
  // }

  openSnackBar(message:string,action:string):void{
    this._snackbar.open(message,action,{
      duration:4000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass:['red-snackbar']
    })
  }
}

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editrecipebox',
  imports: [CommonModule,FormsModule,MatDialogModule,MatButtonModule,MatInputModule,HttpClientModule],
  templateUrl: './editrecipebox.component.html',
  styleUrl: './editrecipebox.component.css'
})
export class EditrecipeboxComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditrecipeboxComponent>,
    private http: HttpClient
  ) {}

  onSave(): void {
    this.http.put(`https://localhost:7033/api/Recipes/update_recipes/${this.data.id}`, this.data).subscribe({
      next: () => {
        alert('Recipe successfully updated!');
        this.dialogRef.close(this.data);
      },
      error: (err) => {
        console.error('Failed to save recipe:', err);
        alert('Failed to update recipe. Please try again.');
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  // Refresh grid data on dialog close
  ngOnDestroy(): void {
    this.dialogRef.afterClosed().subscribe(() => {
      window.location.reload(); // Reloading to update the frontend with backend changes
    });
  }
}

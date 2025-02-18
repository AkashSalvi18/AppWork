import { Component } from '@angular/core';
import{MatCard} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-editprofile',
  imports: [MatCard,MatFormField,MatLabel,MatInputModule,ReactiveFormsModule,MatIconModule,FormsModule,MatButtonModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent {

  readonly email=new FormControl('',[Validators.required,Validators.email]);
}

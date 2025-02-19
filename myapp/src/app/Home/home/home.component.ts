import { Component } from '@angular/core';
import { HomeNavbarComponent } from "../../Navbar/home-navbar/home-navbar.component";
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFooterCellDef, MatHeaderCell, MatHeaderCellDef, MatRowDef, MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [MatCard,MatCardHeader,MatCardTitle,MatCardContent,MatButtonModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
}

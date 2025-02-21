import { Component } from '@angular/core';
import { HomeNavbarComponent } from "../../Navbar/home-navbar/home-navbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [HomeNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
}

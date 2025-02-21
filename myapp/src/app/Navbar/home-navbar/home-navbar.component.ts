import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatListModule} from '@angular/material/list'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home-navbar',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,MatListModule,MatSidenavModule,RouterOutlet,RouterLink],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
  isAuthenticated:boolean=true;
  constructor(private router:Router){}
  onClick():void{
    this.isAuthenticated=false;
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
}

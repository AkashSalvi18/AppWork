import { Component } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './AuthComponents/login/login.component';
import { GridComponent } from "./GridComponents/grid/grid.component";
import { RouterOutlet } from '@angular/router';

import { HomeComponent } from "./Home/home/home.component";
import {HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}

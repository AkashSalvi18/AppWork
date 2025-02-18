import { Routes } from '@angular/router';
import { GridComponent } from './GridComponents/grid/grid.component';
import { LoginComponent } from './AuthComponents/login/login.component';
import { HomeNavbarComponent } from './Navbar/home-navbar/home-navbar.component';
import { HomeComponent } from './Home/home/home.component';
import { EditprofileComponent } from './AuthComponents/Edit/editprofile/editprofile.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { UsersgridComponent } from './GridComponents/usersgrid/usersgrid.component';
import { SignupComponent } from './AuthComponents/signup/signup.component';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'login'},
    {path:'login',component:LoginComponent},
    {path:'navbar',component:HomeNavbarComponent},
    {path:'home',component:HomeComponent},
    {path:'edit',component:EditprofileComponent},
    {path:'signup',component:SignupComponent},
    {path:'dashboard',component:DashboardComponent,children:[
        {path:'grid',component:GridComponent},
        {path:'home',component:HomeComponent},
        {path:'edit',component:EditprofileComponent},
        {path:'usersgrid',component:UsersgridComponent}
    ]}
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AuthGuard } from './services/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //  { path: 'user-profle', component: UserProfileComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reservations',
    component: ReservationsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile', 
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: HomeComponent }, // catch-all in case no other path matched

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

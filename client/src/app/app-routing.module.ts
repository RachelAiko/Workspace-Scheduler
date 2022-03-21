import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboardv2Component } from './components/dashboardv2/dashboardv2.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from './services/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';

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
    path: 'dashboardv2',
    component: Dashboardv2Component,
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
  { path: '**', component: DashboardComponent }, // catch-all in case no other path matched
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

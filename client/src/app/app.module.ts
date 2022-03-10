import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';

import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboardv2Component } from './components/dashboardv2/dashboardv2.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

/* ADDED */
import { DataService } from './services/data.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeskComponent } from './components/dashboardv2/desk/desk.component';
import { ConferenceRoomComponent } from './components/dashboardv2/conference-room/conference-room.component';
/****************** */

@NgModule({
  declarations: [
    // when adding components make sure to put them here
    AppComponent,
    HomeComponent,
    SignupComponent,
    DashboardComponent,
    Dashboardv2Component,
    ForgotPasswordComponent,
    ReservationsListComponent,
    UserProfileComponent,
    NavbarComponent,
    Dashboardv2Component,
    DeskComponent,
    ConferenceRoomComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),

    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,

    FormsModule,
    ReactiveFormsModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),

    NgxPaginationModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}

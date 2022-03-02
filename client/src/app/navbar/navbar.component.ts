import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  baseURL: any;
  headers: any;
  offices: any;
  selectedOffice: any;
  uid: any;

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/';
  }

  async ngOnInit(): Promise<void> {
    await this.SetHeaders();
    this.getAllOffices();
  }

  
  logout(): void {
    this.afAuth.signOut();
  }

  SetHeaders(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((idToken) => {
            this.headers = new HttpHeaders()
              .set('content-type', 'application/json')
              .set('Authorization', idToken);
            this.uid = user.uid;
            resolve();
          });
        }
      });
    });
  }

  getAllOffices() {
    this.http.get(this.baseURL + 'office', { headers: this.headers }).subscribe(
      (response) => {
        this.offices = response;
        this.selectedOffice = this.offices[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

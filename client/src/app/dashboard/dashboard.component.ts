import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  offices: any;
  selectedOffice: any;
  workspaces: any;
  selectedWorkspace: any;

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllOffices();
  }

  logout(): void {
    this.afAuth.signOut();
  }

  getAllOffices() {
    this.http.get('https://localhost:5001/api/office').subscribe(
      (response) => {
        this.offices = response;
        this.selectedOffice = this.offices[0];
        this.getWorkspaces(this.selectedOffice.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectOffice(event: any) {
    this.selectedOffice = this.offices[event.target.value];
    this.getWorkspaces(this.selectedOffice.id);
  }

  getWorkspaces(officeID: string) {
    this.http.get('https://localhost:5001/api/workspace/' + officeID).subscribe(
      (response) => {
        this.workspaces = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

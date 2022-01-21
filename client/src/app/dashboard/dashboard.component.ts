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
  selectedDate: any;
  reservations: any;

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllOffices();
    this.selectedDate = '2022-01-20';
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

  selectDate(data: any) {
    this.selectedDate = data.date;
    this.getReservationsByDate(this.selectedDate, this.selectedOffice.id);
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
    this.getReservationsByDate(this.selectedDate, this.selectedOffice.id);
  }

  getReservationsByDate(date: string, officeID: string) {
    this.http
      .get(
        'https://localhost:5001/api/reservation/ByDate/' + date + '/' + officeID
      )
      .subscribe(
        (response) => {
          this.reservations = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  checkAvailability(workspace: any) {
    if (!this.reservations) return 'Loading';
    for (let reservation of this.reservations) {
      if (reservation.workspace.id == workspace.id) {
        return (
          'Reserved By ' +
          reservation.reservedFor.firstName +
          ' ' +
          reservation.reservedFor.lastName
        );
      }
    }
    return 'Open';
  }
}

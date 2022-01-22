import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  baseURL: any;
  headers: any;
  offices: any;
  selectedOffice: any;
  workspaces: any;
  selectedWorkspace: any;
  selectedDate: any;
  reservations: any;

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/';
  }

  async ngOnInit(): Promise<void> {
    await this.SetHeaders();
    this.getAllOffices();
    this.selectedDate = '2022-01-20';
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
    this.http
      .get(this.baseURL + 'workspace/' + officeID, {
        headers: this.headers,
      })
      .subscribe(
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
      .get(this.baseURL + 'reservation/ByDate/' + date + '/' + officeID, {
        headers: this.headers,
      })
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

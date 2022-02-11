import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';

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
  
  today = new Date().toLocaleDateString('en-US')
  
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/';
  }

  async ngOnInit(): Promise<void> {
    await this.SetHeaders();
    this.getAllOffices();
    this.selectedDate = "";
    this.selectedOffice.officeID = 0;
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
        return 'Reserved For ' + reservation.reservedFor.name;
      }
    }
    return 'Open';
  }

	reserveWorkspace(workspace: any) {
		this.http
      .post(this.baseURL + 'reservation/' + this.selectedDate + '/' + workspace.id, null, {
        headers: this.headers,
      })
      .subscribe(
        (response) => {
					console.log('Reservation created in MongoDB');
          console.log(response);
					this.checkAvailability(workspace);
        },
        (error) => {
					console.log('Error: Reservation NOT created in MongoDB');
          console.log(error);
        }
      );
	}
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
  selectedReservation: any;
  uid: any;
  reservations: any;


  // today = new Date().toLocaleDateString('en-US');
  today = new Date().toISOString().split('T')[0];


  // Do we need this?
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/';
  }

  async ngOnInit(): Promise<void> {
    await this.SetHeaders();
    this.getAllOffices();
    this.selectedDate = this.today;
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
        //(this.reservations).css('background-color', 'red');
       // return 'Reserved For ' + reservation.reservedFor.name.css('background-color', 'red');   //logic for color based on availability will go here
        return 'Reserved For ' + reservation.reservedFor.name
      }

    }

    if (workspace.isPermanent === true)
      return 'Permanently reserved for ' + workspace.permanentFor.name;
    else return 'Open';
  }

  /*
		I Think this was copied from the reservations-list component but it's not needed here?
		- Ken
	*/
  // getReservations() {
  //   this.http
  //     .get(this.baseURL + 'reservation/' + this.uid, {
  //       headers: this.headers,
  //     })
  //     .subscribe(
  //       (response) => {
  //         this.reservations = response;
  //         this.selectedReservation = this.reservations[0];
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  reserveWorkspace(workspace: any, requestedID: any) {
    if (requestedID === '') requestedID = this.uid;

    this.http
      .post(
        this.baseURL + 'reservation/' + this.selectedDate + '/' + workspace.id,
        JSON.stringify(requestedID),
        {
          headers: this.headers,
        }
      )
      .subscribe(
        (response) => {
          console.log('Reservation created in MongoDB');
          console.log(response);
          this.getReservationsByDate(this.selectedDate, this.selectedOffice.id);
        },
        (error) => {
          console.log('Error: Reservation NOT created in MongoDB');
          console.log(error);
        }
      );
  }


  makePermanent(workspace: any, requestedID: any) {
    if (requestedID === '') requestedID = this.uid;

    this.http
      .put(
        this.baseURL + 'workspace/' + workspace.id + '/' + requestedID,
        null,
        {
          headers: this.headers,
        }
      )
      .subscribe(
        (response) => {
          console.log('Workspace updated in MongoDB');
          console.log(response);
          this.getWorkspaces(this.selectedOffice.id);
        },
        (error) => {
          console.log('Error: Workspace NOT updated in MongoDB');
          console.log(error);
        }
      );
  }

  removePermanent(workspace: any) {
    this.http
      .put(this.baseURL + 'workspace/' + workspace.id, null, {
        headers: this.headers,
      })
      .subscribe(
        (response) => {
          console.log('Workspace updated in MongoDB');
          console.log(response);
          this.getWorkspaces(this.selectedOffice.id);
        },
        (error) => {
          console.log('Error: Workspace NOT updated in MongoDB');
          console.log(error);
        }
      );
  }
}

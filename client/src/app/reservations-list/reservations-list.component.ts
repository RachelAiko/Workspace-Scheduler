import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css'],
})
export class ReservationsListComponent implements OnInit {
  baseURL: any;
  headers: any;
  reservations: any;
  selectedReservation: any;

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/';
  }

  async ngOnInit(): Promise<void> {
    await this.SetHeaders();
    this.getReservations();
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

  getReservations() {
    this.http
      .get(this.baseURL + 'reservation', {
        headers: this.headers,
      })
      .subscribe(
        (response) => {
          this.reservations = response;
          this.selectedReservation = this.reservations[0];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  selectReservation(reservation: any): void {
    this.selectedReservation = reservation;
  }

  deleteReservation() {
    this.http
      .delete(this.baseURL + 'reservation/' + this.selectedReservation.id, {
        headers: this.headers,
      })
      .subscribe(
        (response) => {
          console.log('Reservation successfully deleted');
          console.log(response);
          this.getReservations();
        },
        (error) => {
          console.log('Error: Reservation NOT deleted in MongoDB');
          console.log(error);
        }
      );
  }
}

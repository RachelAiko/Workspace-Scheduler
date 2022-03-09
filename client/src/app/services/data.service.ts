import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/User';
import { Office } from '../models/Office';
import { Workspace } from '../models/Workspace';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly _baseUrl: string = 'https://localhost:5001/api/';
  private _httpOptions: any = {};

  private readonly _currentUser = new BehaviorSubject<User | null>(null);
  get currentUser(): any {
    return this._currentUser.getValue();
  }
  private set currentUser(val: any) {
    this._currentUser.next(val);
  }

  private readonly _users = new BehaviorSubject<User[]>([]);
  readonly users$ = this._users.asObservable();
  get users(): any {
    return this._users.getValue();
  }
  private set users(val: any) {
    this._users.next(val);
  }

  private readonly _offices = new BehaviorSubject<Office[]>([]);
  readonly offices$ = this._offices.asObservable();
  get offices(): any {
    return this._offices.getValue();
  }
  private set offices(val: any) {
    this._offices.next(val);
  }

  private readonly _workspaces = new BehaviorSubject<Workspace[]>([]);
  readonly workspaces$ = this._workspaces.asObservable();
  get workspaces(): any {
    return this._workspaces.getValue();
  }
  private set workspaces(val: any) {
    this._workspaces.next(val);
  }

  private readonly _reservations = new BehaviorSubject<Reservation[]>([]);
  readonly reservations$ = this._reservations.asObservable();
  get reservations(): any {
    return this._reservations.getValue();
  }
  private set reservations(val: any) {
    this._reservations.next(val);
  }

  private readonly _reservationsByDate = new BehaviorSubject<Reservation[]>([]);
  readonly reservationsByDate$ = this._reservationsByDate.asObservable();
  get reservationsByDate(): any {
    return this._reservationsByDate.getValue();
  }
  private set reservationsByDate(val: any) {
    this._reservationsByDate.next(val);
  }

  private readonly _loading = new BehaviorSubject(false);
  readonly loading$ = this._loading.asObservable();
  get loading(): any {
    return this._loading.getValue();
  }
  private set loading(val: any) {
    this._loading.next(val);
  }

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {}

  initialize(): Promise<void> {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((idToken) => {
            this._httpOptions = {
              headers: new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', idToken),
            };
            this.getCurrentUser();
            this.getReservations();
            this.getUsers();
            this.getOffices();
            this.getWorkspaces();
            this.loading = false;
            resolve();
          });
        }
      });
    });
  }

  selfDestruct() {
    this.currentUser = null;
    this.users = [];
    this.offices = [];
    this.workspaces = [];
    this.reservations = [];
    this.reservationsByDate = [];
    this.loading = false;
  }

  getCurrentUser() {
    this.loading = true;
    this.http
      .get<User>(this._baseUrl + 'user/me', this._httpOptions)
      .subscribe((user) => {
        this.currentUser = user;
        this.loading = false;
      });
  }

  getUsers() {
    this.loading = true;
    this.http
      .get<User>(this._baseUrl + 'user', this._httpOptions)
      .subscribe((users) => {
        this.users = users;
        this.loading = false;
      });
  }

  getOffices() {
    this.loading = true;
    this.http
      .get<Office[]>(this._baseUrl + 'office', this._httpOptions)
      .subscribe((offices) => {
        this.offices = offices;
        this.loading = false;
      });
  }

  getWorkspaces() {
    this.loading = true;
    this.http
      .get<Workspace[]>(this._baseUrl + 'workspace', this._httpOptions)
      .subscribe((workspaces) => {
        this.workspaces = workspaces;
        this.loading = false;
      });
  }

  filterWorkspaces(office: any): Workspace[] {
    return this.workspaces.filter((wrk: any) => wrk.office.id === office.id);
  }

  getReservations() {
    this.loading = true;
    this.http
      .get<Reservation[]>(this._baseUrl + 'reservation', this._httpOptions)
      .subscribe((reservations) => {
        this.reservations = reservations;
        this.loading = false;
      });
  }

  getReservationsByDate(date: any) {
    this.loading = true;
    this.http
      .get<Reservation[]>(
        this._baseUrl +
          'reservation/search?date=' +
          date.toISOString().split('T')[0],
        this._httpOptions
      )
      .subscribe((reservations) => {
        this.reservationsByDate = reservations;
        this.loading = false;
      });
  }

  postReservation(date: any, workspace: any, requestedID: any) {
    if (requestedID === null) requestedID = this.currentUser.authID;

    this.http
      .post(
        this._baseUrl +
          'reservation/' +
          date.toISOString().split('T')[0] +
          '/' +
          workspace.id,
        JSON.stringify(requestedID),
        this._httpOptions
      )
      .subscribe(
        (response) => {
          console.log('Reservation created in MongoDB');
          console.log(response);
          this.reservations = [response, ...this.reservations];
          this.reservationsByDate = [response, ...this.reservationsByDate];
        },
        (error) => {
          console.log('Error: Reservation NOT created in MongoDB');
          console.log(error);
        }
      );
  }

  deleteReservation(reservation: any) {
    this.http
      .delete(
        this._baseUrl + 'reservation/' + reservation.id,
        this._httpOptions
      )
      .subscribe(
        (response) => {
          console.log('Reservation successfully deleted');
          console.log(response);
          this.reservations = this.reservations.filter(
            (rsv: any) => rsv !== reservation
          );
        },
        (error) => {
          console.log('Error: Reservation NOT deleted in MongoDB');
          console.log(error);
        }
      );
  }

  makePermanent(workspace: any, requestedID: any) {
    if (requestedID === null) requestedID = this.currentUser.authID;
    this.http
      .put(
        this._baseUrl + 'workspace/' + workspace.id + '/' + requestedID,
        null,
        this._httpOptions
      )
      .subscribe(
        (response) => {
          console.log('Workspace updated in MongoDB');
          console.log(response);
          this.updateWorkspace(response);
        },
        (error) => {
          console.log('Error: Workspace NOT updated in MongoDB');
          console.log(error);
        }
      );
  }

  removePermanent(workspace: any) {
    this.http
      .put(this._baseUrl + 'workspace/' + workspace.id, null, this._httpOptions)
      .subscribe(
        (response) => {
          console.log('Workspace updated in MongoDB');
          console.log(response);
          this.updateWorkspace(response);
        },
        (error) => {
          console.log('Error: Workspace NOT updated in MongoDB');
          console.log(error);
        }
      );
  }

  updateWorkspace(updatedWorkspace: any) {
    let workspace = this.workspaces.find(
      (wrk: any) => wrk.id === updatedWorkspace.id
    );
    if (workspace) {
      const index = this.workspaces.indexOf(workspace);
      this.workspaces[index] = {
        ...workspace,
        isPermanent: updatedWorkspace.isPermanent,
        permanentFor: updatedWorkspace.permanentFor,
      };
    }
    this.workspaces = [...this.workspaces];
  }
}

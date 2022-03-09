import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selectedOffice: any;
  selectedUser: any;
  selectedWorkspace: any;
  selectedReservation: any;
  selectedDate: any;

  today = new Date();
  maxDate = new Date(2022, 11, 31);

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    if (history.state.date === undefined) {
      this.selectedDate = new Date(
        this.today.getTime() - this.today.getTimezoneOffset() * 60000
      );
    } else {
      this.selectedDate = history.state.date;
    }
    this.dataService.getReservationsByDate(this.selectedDate);
    this.selectedUser = null;
    this.dataService.offices$.subscribe((offices) => {
      if (history.state.office !== undefined)
        this.selectedOffice = history.state.office;
      if (this.selectedOffice === undefined) this.selectedOffice = offices[0];
    });
  }

  selectOffice(event: any) {
    this.selectedOffice = this.dataService.offices[event.target.value];
  }

  selectUser(event: any) {
    this.selectedUser = this.dataService.users[event.target.value];
  }

  selectDate(newDate: any) {
    this.selectedDate = newDate;
    this.dataService.getReservationsByDate(newDate);
  }

  checkAvailability(workspace: any) {
    if (workspace.isPermanent === true)
      return 'Permanently reserved for ' + workspace.permanentFor.name;
    else {
      for (let reservation of this.dataService.reservationsByDate) {
        if (reservation.workspace.id === workspace.id) {
          //(this.reservations).css('background-color', 'red');
          // return 'Reserved For ' + reservation.reservedFor.name.css('background-color', 'red');   //logic for color based on availability will go here
          return 'Reserved For ' + reservation.reservedFor.name;
        }
      }
    }
    return 'Open';
  }
}

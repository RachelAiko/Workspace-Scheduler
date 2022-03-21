import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/app/models/Workspace';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboardv2',
  templateUrl: './dashboardv2.component.html',
  styleUrls: ['./dashboardv2.component.css'],
})
export class Dashboardv2Component implements OnInit {
  selectedOffice: any;
  selectedWorkspace: any = null;
  desks: Workspace[] | null = null;
  conferenceRooms: Workspace[] | null = null;
  selectedDate: any;

  today = new Date();
  maxDate = new Date(2022, 11, 31);

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.selectedDate = new Date(
      this.today.getTime() - this.today.getTimezoneOffset() * 60000
    );
    this.dataService.getReservationsByDate(this.selectedDate);
    this.dataService.offices$.subscribe((offices) => {
      if (this.selectedOffice === undefined) this.selectedOffice = offices[0];
    });
    this.dataService.workspaces$.subscribe((workspaces) => {
      this.desks = this.dataService.filterDesks(this.selectedOffice);
      this.conferenceRooms = this.dataService.filterConferenceRooms(
        this.selectedOffice
      );
    });
  }

  selectOffice(event: any) {
    this.selectedOffice = this.dataService.offices[event.target.value];
  }

  selectDate(newDate: any) {
    this.selectedWorkspace = null;
    this.selectedDate = newDate;
    this.dataService.getReservationsByDate(newDate);
  }

  checkRotation(i: any) {
    return (i >= 4 && i < 8) || (i >= 12 && i < 16);
  }

  selectWorkspace(event: any) {
    this.selectedWorkspace = event;
  }

  checkAvailability() {
    if (this.selectedWorkspace.isPermanent === true)
      return (
        'Permanently reserved for ' + this.selectedWorkspace.permanentFor.name
      );
    else {
      for (let reservation of this.dataService.reservationsByDate) {
        if (reservation.workspace.id === this.selectedWorkspace.id) {
          return 'Reserved For ' + reservation.reservedFor.name;
        }
      }
    }
    return 'Open';
  }
}

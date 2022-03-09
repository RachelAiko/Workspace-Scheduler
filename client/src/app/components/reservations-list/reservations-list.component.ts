import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css'],
})
export class ReservationsListComponent implements OnInit {
  selectedReservation: any;

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.reservations$.subscribe((rsv) => {
      this.selectedReservation = rsv[0];
    });
  }

  selectReservation(reservation: any): void {
    this.selectedReservation = reservation;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css'],
})
export class ReservationsListComponent implements OnInit {
  searchString: string = '';
  reservations: any;
  selectedReservation: any;
  p: number = 1;
  count: number = 20;

  constructor(public dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.reservations$.subscribe((rsv) => this.search(null));
  }

  selectReservation(reservation: any) {
    this.selectedReservation = reservation;
  }

  viewReservation(reservation: any) {
    let date = new Date(reservation.date);
    this.router.navigate(['/dashboard'], {
      state: { date: date, office: reservation.workspace.office },
    });
  }

  search(event: any) {
    if (event === null)
      this.reservations = this.dataService.filterReservations('');
    else
      this.reservations = this.dataService.filterReservations(
        event.target.value
      );
    this.selectedReservation = this.reservations[0];
  }
}

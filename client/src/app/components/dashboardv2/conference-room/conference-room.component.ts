import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Workspace } from 'src/app/models/Workspace';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'conference-room',
  template: `
    <button class="btn" (click)="onClick()">
      <img src="/assets/conference-room-available.png" alt="" />
    </button>
  `,
  styleUrls: ['./conference-room.component.css'],
})
export class ConferenceRoomComponent implements OnInit {
  @Input() conferenceRoom: Workspace | null = null;

  @Output() clicked = new EventEmitter<Workspace | null>();

  constructor(public dataService: DataService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.clicked.emit(this.conferenceRoom);
  }

  getImage(): string {
    if (this.conferenceRoom?.isPermanent) {
      return './assets/desk-permanent.png';
    } else {
      if (this.dataService.isAvailable(this.conferenceRoom)) {
        return './assets/desk-available.png';
      } else {
        return './assets/desk-reserved.png';
      }
    }
  }
}

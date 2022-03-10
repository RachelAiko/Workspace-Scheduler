import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Workspace } from 'src/app/models/Workspace';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'desk',
  template: `
    <button class="btn" (click)="onClick()">
      <img [ngClass]="{ rotated: rotated }" src="{{ getImage() }}" alt="" />
    </button>
  `,
  styleUrls: ['./desk.component.css'],
})
export class DeskComponent implements OnInit {
  @Input() desk: Workspace | null = null;
  @Input() rotated: boolean = false;

  @Output() clicked = new EventEmitter<Workspace | null>();

  constructor(public dataService: DataService) {}

  ngOnInit(): void {}

  onClick(): void {
    this.clicked.emit(this.desk);
  }

  getImage(): string {
    if (this.desk?.isPermanent) {
      return './assets/desk-permanent.png';
    } else {
      if (this.dataService.isAvailable(this.desk)) {
        return './assets/desk-available.png';
      } else {
        return './assets/desk-reserved.png';
      }
    }
  }
}

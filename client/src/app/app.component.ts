import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Rachelcd';

  title = 'auth1';

  constructor(
    private afAuth: AngularFireAuth,
    public dataService: DataService
  ) {}

  ngOnInit() {
    this.afAuth.onAuthStateChanged((user: any) => {
      if (user) {
        this.dataService.initialize();
      } else {
        this.dataService.selfDestruct();
      }
    });
  }
}

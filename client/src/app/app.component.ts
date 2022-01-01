import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Rachelcd';
  users: any;

  title = 'auth1';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTest();
  }

  getTest() {
    this.http.get('https://localhost:5001/api/users').subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

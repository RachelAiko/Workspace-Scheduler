import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  baseURL: any;
  headers: any;

  constructor(public afAuth: AngularFireAuth, private http: HttpClient) {
    this.baseURL = 'https://localhost:5001/api/';
  }

  ngOnInit(): void {
  }

}

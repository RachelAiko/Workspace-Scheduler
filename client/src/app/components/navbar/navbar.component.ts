import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth) {}

  async ngOnInit() {}

  logout(): void {
    this.afAuth.signOut();
  }
}

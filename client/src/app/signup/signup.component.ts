import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  async signup() {
    if (this.signupForm.invalid)
      // if there's an error in the form, don't submit it
      return;

    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result == null) {
          // null is success, false means there was an error
          this.createNewUser(this.signupForm.value.displayName);
          this.router.navigate(['/dashboard']);
        } else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;
      })
      .catch(() => {});
  }

  createNewUser(displayName: string): Promise<void> {
    return new Promise((resolve, reject) => {
			// on auth state change
      this.afAuth.onAuthStateChanged((user) => {
				// if user exists
        if (user) {
					// get JWT
          user.getIdToken().then((idToken) => {
						// Store headers in variable
            var headers = new HttpHeaders()
              .set('content-type', 'application/json')
              .set('Authorization', idToken);

						// post request to backend
            this.http
              .post(
                'https://localhost:5001/api/user',
                JSON.stringify(displayName),
                { headers }
              )
              .subscribe(
                (response) => {
                  console.log('Account successfully created in MongoDB');
                  console.log(response);
                },
                (error) => {
                  console.log('Account NOT created in MongoDB (see error)');
                  console.log(error);
                }
              );
            resolve();
          });
        }
      });
    });
  }
}

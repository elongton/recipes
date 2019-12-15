import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: Observable<firebase.User>;

    constructor(private afAuth: AngularFireAuth, private router: Router, private ngZone: NgZone) {
        this.user = afAuth.authState;
    }
    loginGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then(() => {
                setTimeout(() => {
                    this.ngZone.run(() => this.router.navigate(['/']));

                }, 50)//TODO: something going on here
            }, err => {
                console.log(err);
            });
    }
    currentUser() {
        return this.afAuth.auth.currentUser;
    }
    // Used by the http interceptor to set the auth header
    getUserIdToken(): Observable<string> {
        return from(this.afAuth.auth.currentUser.getIdToken());
    }

    logout() {
        this.afAuth.auth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }
}

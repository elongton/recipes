import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer'
import * as UserActions from '../../user/store/user.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // user: Observable<firebase.User>;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        // private ngZone: NgZone,
        private store: Store<fromApp.AppState>

    ) {
        // this.user = afAuth.authState;
    }
    loginGoogle() {
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
            .then((user) => {
                this.store.dispatch(new UserActions.UpdateUserFromAuth(user.additionalUserInfo.profile))
                // console.log(this.afAuth.authState)
                // setTimeout(() => {
                //     // this.ngZone.run(() => this.router.navigate(['/']));


                // }, 50)//TODO: something going on here
            }, err => {
                console.log(err);
            });
    }
    currentUser() {
        return this.afAuth.auth.currentUser;
    }

    // userFirstName() {
    //     return this.user.pipe(map(user => {
    //         return user.displayName.split(" ")[0];
    //     }))
    // }
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

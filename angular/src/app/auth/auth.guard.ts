import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.auth.user.pipe(
            take(1),
            map(user => {
                // console.log('user: ', user);
                return !!user
            }),
            tap(loggedIn => {
                // console.log("loggedIn: ", loggedIn);
                if (!loggedIn) {
                    // console.log("access denied");
                    this.router.navigate(['/login']);
                }
            })
        );
    }

}


// getToken(): Observable<string | null> {
//     return this.afAuth.authState.pipe(
//       take(1),
//       switchMap((user) => {
//         if (user) {
//           return from(user.getIdToken())
//         }
//         return of(null);
//       })
//     )
//   }
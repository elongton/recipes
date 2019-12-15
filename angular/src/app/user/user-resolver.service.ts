import { Injectable } from "@angular/core";
import { Actions, ofType } from '@ngrx/effects';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { take, map } from "rxjs/operators";

import * as UserActions from './store/user.actions'

@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<any>{

    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('user').pipe(
            take(1),
            map(user => {
                console.log(user)
                if (user.meta === null) { this.store.dispatch(new UserActions.BeginRetrieveMeta) }
                return this.actions$.pipe(ofType(UserActions.BEGIN_RETRIEVE_META), take(1));
            }));
    }
}
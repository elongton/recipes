import { Injectable } from "@angular/core";
import { Actions, ofType } from '@ngrx/effects';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import { take, map, switchMap, tap } from "rxjs/operators";
import * as TagActions from './store/tag.actions'

@Injectable({ providedIn: 'root' })
export class TagResolverService implements Resolve<any>{

    constructor(private store: Store<fromApp.AppState>, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('tags').pipe(
            take(1),
            map(tags => {
                if (tags.tags.length == 0) { this.store.dispatch(new TagActions.BeginRetrieveTags) }
                return this.actions$.pipe(ofType(TagActions.BEGIN_RETRIEVE_TAGS), take(1));
            }));
    }
}
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import * as TagActions from './tag.actions';
import { Tag } from 'src/app/core/models/tag.model';

@Injectable()
export class TagEffects {
    @Effect()
    retrieveTags = this.actions$.pipe(
        ofType(TagActions.BEGIN_RETRIEVE_TAGS),
        switchMap(() => {
            return this.http.get<Tag[]>(`api/tags/`)
        }),
        map(tags => {
            return new TagActions.SuccessRetrieveTags(tags);
        }),
        catchError((error: Error) => {
            return of(new TagActions.TagHTTPError(error));
        })
    )



    constructor(private actions$: Actions, private http: HttpClient) { }
}
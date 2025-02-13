import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as fromApp from '../../store/app.reducer'
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

    @Effect({ dispatch: false })
    updateUserFromAuth = this.actions$.pipe(
        ofType(UserActions.UPDATE_USER_FROM_AUTH),
        tap(() => {
            this.ngZone.run(() => this.router.navigate(['/']));
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    );


    @Effect()
    getData = this.actions$.pipe(
        ofType(UserActions.BEGIN_RETRIEVE_USER_DATA),
        switchMap(() => {
            return this.http.get(`api/user/`);
        }),
        map(data => {
            // console.log(data)
            return new UserActions.SuccessRetrieveUserData(data);
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    )

    @Effect({ dispatch: false })
    updateMeta = this.actions$.pipe(
        ofType(UserActions.UPDATE_META),
        withLatestFrom(this.store.select('user')),
        switchMap(([actionData, user]) => {
            // console.log('effect fired')
            // console.log(user)
            return this.http.put(`api/user/meta`, user.meta)
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    );

    @Effect({ dispatch: false })
    addToRecipeBook = this.actions$.pipe(
        ofType(UserActions.ADD_TO_RECIPE_BOOK),
        withLatestFrom(this.store.select('user')),
        switchMap(([actionData, user]) => {
            return this.http.put(`api/user/recipebook`, user.recipeBook)
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    );

    @Effect({ dispatch: false })
    updateShoppingList = this.actions$.pipe(
        ofType(UserActions.ADD_TO_SHOPPING_LIST, UserActions.REMOVE_FROM_SHOPPING_LIST),
        withLatestFrom(this.store.select('user')),
        switchMap(([actionData, user]) => {
            return this.http.put(`api/user/shoppinglist`, user.shoppingList)
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    );

    @Effect()
    updateRecipeBook = this.actions$.pipe(
        ofType(UserActions.BEGIN_UPDATE_RECIPE_BOOK),
        withLatestFrom(this.store.select('user')),
        switchMap(([actionData, user]: [UserActions.BeginUpdateRecipeBook, any]) => {
            const updatedRecipes = [...user.recipeBook.recipes];
            const indexToUpdate = updatedRecipes.findIndex(recipe => { return recipe.id === actionData.payload.id })
            updatedRecipes[indexToUpdate] = actionData.payload;
            return this.http.put(`api/user/recipebook`, { recipes: updatedRecipes })
        }),
        map(updatedRecipeBook => {
            return new UserActions.SuccessUpdateRecipeBook(updatedRecipeBook);
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    );


    @Effect()
    updateMealPlanner = this.actions$.pipe(
        ofType(UserActions.UPDATE_MEAL_PLANNING_PERIOD, UserActions.UPDATE_PLANNED_MEALS_ARRAY),
        withLatestFrom(this.store.select('user')),
        switchMap(([actionData, user]: [UserActions.UpdateMealPlanningPeriod, any]) => {
            return this.http.put(`api/user/mealplanner`, user.mealPlanner)
        }),
        map(updatedRecipeBook => {
            return new UserActions.SuccessUpdateRecipeBook(updatedRecipeBook);
        }),
        catchError((error: Error) => {
            return of(new UserActions.UserHTTPError(error));
        })
    );


    constructor(private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>,
        private router: Router,
        private ngZone: NgZone) { }
}
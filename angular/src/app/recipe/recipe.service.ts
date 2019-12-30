import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/core/models/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  elementToFocus$ = new Subject();
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private http: HttpClient,
  ) { }

  createUpdateRecipe(formPrecursor, recipeId?) {
    let formDataToSend = new FormData();
    formDataToSend.append("fields", JSON.stringify(formPrecursor.recipeForm));
    if (formPrecursor.image) {
      try {
        formDataToSend.append("imageToUpload", formPrecursor.image, formPrecursor.image.name);
      } catch (e) { console.error(e) }
    } else {
      formDataToSend.append("imageToUpload", '');
    }
    if (recipeId) return this.http.put<Recipe>(`api/recipes/${recipeId}`, formDataToSend).subscribe(
      result => { console.log(result); this.store.dispatch(new RecipeActions.SuccessUpdateRecipe(result)) })
    else return this.http.post<Recipe>(`api/recipes/`, formDataToSend).subscribe(
      result => {
        this.store.dispatch(new RecipeActions.SuccessCreateRecipe(result))
      })
  }

}





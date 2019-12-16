import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, of, Subject, Observable } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Recipe } from '../core/models/recipe.model';
import { HelperService } from '../shared/helper.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from '../recipe/store/recipe.actions';

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  elementToFocus$ = new Subject();
  constructor(
    private http: HttpClient,
    private router: Router,
    private helperService: HelperService,
    private store: Store<fromApp.AppState>,
  ) { }







  // getRecipes() {
  //   return this.http.get<Recipe[]>(`api/recipes/`).subscribe(result => {
  //     this.store.dispatch(new RecipeActions.SetRecipes(result))
  //   });
  // }


  // submitRecipe(recipe) {
  //   return this.http.post<Recipe>(`api/recipes/`, recipe).pipe(
  //     tap(result => {
  //       this.addRecipeToSubjectAndNavigate(result)
  //     })
  //   );
  // }


  // updateRecipe(recipe, recipeId: Number) {
  //   return this.http.put(`api/recipes/${recipeId}`, recipe).pipe(
  //     tap(result => {
  //       this.addRecipeToSubjectAndNavigate(result, true)
  //     })
  //   );
  // }


  // deleteRecipe(recipe) {
  //   return this.http.delete(`api/recipes/${recipe.id}`).subscribe(result => {
  //     this.appService.recipes$.next(
  //       this.appService.recipes$.getValue().filter(r => r.id !== recipe.id)
  //     );
  //   });
  // }


  // retrieveRecipe(recipeId: Number): Observable<Recipe> {
  //   return this.http.get<Recipe>(`api/recipes/${recipeId}`);
  // }

  // addRecipeToSubjectAndNavigate(result, update?: boolean) {
  //   let currentRecipeList = this.appService.recipes$.getValue();
  //   console.log(result)
  //   if (result.image) result.image = this.helperService.replaceImageUrl(result)
  //   console.log(result)
  //   if (update) {
  //     let updatedRecipeId = currentRecipeList.findIndex(r => { return r.id === result.id })
  //     currentRecipeList[updatedRecipeId] = result;
  //   } else {
  //     currentRecipeList.push(result);
  //   }
  //   this.appService.recipes$.next(currentRecipeList);
  //   this.nagivateToRecipe(result.id);
  // }

  // updateRecipeSubject(recipe: Recipe) {
  //   let currentRecipeList = this.appService.recipes$.getValue();
  //   let updatedRecipeId = currentRecipeList.findIndex(r => { return r.id === recipe.id })
  //   currentRecipeList[updatedRecipeId] = recipe;
  //   this.appService.recipes$.next(currentRecipeList);
  // }


  public nagivateToRecipe(id) {
    this.router.navigate(["/recipe/view", id]);
  }

  scanRecipeList(selectedRecipes) {
    let shoppingList = [];
    selectedRecipes.forEach(recipe => {
      console.log(recipe)
      recipe.ingredient_sections.forEach(section => {
        section.ingredients.forEach(ingredient => {
          let found = false;
          shoppingList.forEach(shoppingListItem => {
            if (shoppingListItem.ingredient_id === ingredient.ingredient_id && ingredient.unit_multiplier > 0 && shoppingListItem.unit_multiplier > 0) {
              shoppingListItem.ingredient_quantity = ingredient.ingredient_quantity * ingredient.unit_multiplier + shoppingListItem.ingredient_quantity;
              //set the largest base unit and its multiplier

              // if (ingredient.unit_multiplier > shoppingListItem.unit_multiplier) {
              //   shoppingListItem.unit = ingredient.unit;
              //   shoppingListItem.unit_multiplier = ingredient.unit_multiplier
              // } else {
              //   shoppingListItem.quantity = ingredient.quantity + shoppingListItem.quantity;
              // }
              found = true
            } else if (shoppingListItem.ingredient_id === ingredient.ingredient_id && ingredient.unit_multiplier == 0 && shoppingListItem.unit_multiplier == 0) {
              shoppingListItem.ingredient_quantity = ingredient.ingredient_quantity + shoppingListItem.ingredient_quantity;
              found = true
            };

          })
          if (found === false) {
            if (ingredient.unit_multiplier > 0) {
              ingredient.ingredient_quantity = ingredient.ingredient_quantity * ingredient.unit_multiplier
              shoppingList.push(ingredient)
            } else if (ingredient.unit_multiplier == 0) {
              shoppingList.push(ingredient)
            }
          }
        })
      })
    })
    // normalize the units
    shoppingList.forEach(ingredient => {
      // console.log(ingredient)
      if (ingredient.unit_multiplier > 0) {
        ingredient.ingredient_quantity = ingredient.ingredient_quantity / ingredient.unit_multiplier;
      }
    })
    return shoppingList;
  }



}

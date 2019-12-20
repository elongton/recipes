import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/core/models/recipe.model';

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  elementToFocus$ = new Subject();
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  public nagivateToRecipe(id) {
    this.router.navigate(["/recipe/view", id]);
  }


  createUpdateRecipe(formPrecursor, recipeId?) {
    let formDataToSend = new FormData();
    formDataToSend.append("fields", JSON.stringify(formPrecursor.recipeForm));
    if (formPrecursor.image) {
      //if user uploads a new image, backend uploads and replaces
      try {
        formDataToSend.append("image", formPrecursor.image, formPrecursor.image.name);
      } catch (e) { console.error(e) }
    } else {
      //if user doesn't change image, nothing is sent, and backend retains existing image
      formDataToSend.append("image", '');
    }
    if (recipeId) return this.http.put<Recipe>(`api/recipes/${recipeId}`, formDataToSend)
    else return this.http.post<Recipe>(`api/recipes/`, formDataToSend)
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





import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
    providedIn: "root"
})
export class ShoppingListService {
    constructor(
        private store: Store<fromApp.AppState>,
    ) { }



    scanRecipeList(selectedRecipes) {
        let shoppingList = [];
        selectedRecipes.forEach(recipe => {
            // console.log(recipe)
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
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class HelperService {
    constructor() { }

    filterRecipes(arrayToBeFiltered, ingredientFilterArray) {
        ingredientFilterArray.forEach(ingredientFilter => {
            console.log(ingredientFilter)
            arrayToBeFiltered = arrayToBeFiltered.filter(recipeItem => {
                return this.checkIfIngredient(recipeItem, ingredientFilter.id)
            })
            // console.log(element)
        });
        return arrayToBeFiltered

    }

    checkIfIngredient(recipeItem, ingredientId) {
        return recipeItem.ingredients.filter(r => { return r.id == ingredientId }).length > 0
    }
}




// r.ingredients.forEach(ing => {
//     if (ing.id === ingFilt.id) {
//         return true
//     }
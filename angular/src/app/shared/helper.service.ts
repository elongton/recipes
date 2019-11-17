import { Injectable } from "@angular/core";
import fraction from 'fraction.js'

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
        });
        return arrayToBeFiltered

    }

    checkIfIngredient(recipeItem, ingredientId) {
        let recipeHasIngredient = false;
        recipeItem.ingredient_sections.forEach(section => {
            console.log(section)
            if (section.ingredients.filter(r => { return r.ingredient_id == ingredientId }).length > 0) {
                recipeHasIngredient = true
            }

        });
        return recipeHasIngredient;
    }

    roundToNearest(amount) {
        let fractionArray = [2, 3, 4, 5]
        let goodness = { diff: 100, amount: null };
        fractionArray.forEach(divisor => {
            let calc = Math.ceil(amount * divisor) / divisor;
            if (goodness.diff > Math.abs(amount - calc)) {
                goodness.diff = Math.abs(amount - calc);
                goodness.amount = calc
            }
        })
        return goodness.amount
    }


    numberToFraction(amount) {
        let x = new fraction(amount);
        let res = x.toFraction(true);
        return res
        // return amount
    };
}




// r.ingredients.forEach(ing => {
//     if (ing.id === ingFilt.id) {
//         return true
//     }
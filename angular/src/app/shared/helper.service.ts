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
            // console.log(element)
        });
        return arrayToBeFiltered

    }

    checkIfIngredient(recipeItem, ingredientId) {
        return recipeItem.ingredients.filter(r => { return r.id == ingredientId }).length > 0
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
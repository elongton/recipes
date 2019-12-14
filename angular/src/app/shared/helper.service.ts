import { Injectable } from "@angular/core";
import fraction from 'fraction.js'
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class HelperService {
    constructor() { }

    filterRecipes(arrayToBeFiltered, ingredientFilterArray, tagFilterArray) {
        ingredientFilterArray.forEach(ingredientFilter => {
            arrayToBeFiltered = arrayToBeFiltered.filter(recipeItem => {
                return this.checkIfIngredient(recipeItem, ingredientFilter.id)
            })
        });
        tagFilterArray.forEach(tagFilter => {
            arrayToBeFiltered = arrayToBeFiltered.filter(recipeItem => {
                return this.checkIfTag(recipeItem, tagFilter.id)
            })
        })
        return arrayToBeFiltered
    }

    checkIfTag(recipeItem, tagId) {
        let recipeHasTag = false;
        if (recipeItem.tags.filter(r => { return r.id == tagId }).length > 0) {
            recipeHasTag = true
        }
        return recipeHasTag;
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

    public blobToFile = (theBlob: any, fileName: string): File => {
        var b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        //Cast to a File() type
        return <File>theBlob;
    }


    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    replaceImageUrl(result) {
        return result.image.replace(environment.imageDomain, "")
    }
}






// r.ingredients.forEach(ing => {
//     if (ing.id === ingFilt.id) {
//         return true
//     }
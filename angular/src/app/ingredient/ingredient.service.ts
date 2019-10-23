import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class IngredientService {
    ingredients$ = new BehaviorSubject<any>([])
    constructor(private http: HttpClient) { }


    getIngredients() {
        return this.http.get(`/api/ingredients/`).subscribe(result => {
            this.ingredients$.next(result)
        });
    }

    deleteIngredient(ingredient) {
        return this.http.delete(`/api/ingredient/${ingredient.id}`).subscribe(result => {
            console.log(result)
        })
    }

    editIngredient(ingredient) {
        return this.http.put(`/api/ingredient/${ingredient.id}`, ingredient).subscribe(result => {
            console.log(result)
        })
    }

    createIngredient(ingredient) {
        return this.http.post(`/api/ingredients/`, ingredient).subscribe(result => {
            console.log(result)
        })
    }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from '../../app.service';

@Injectable({
    providedIn: "root"
})
export class IngredientService {
    constructor(
        private http: HttpClient,
        private appService: AppService,
    ) { }


    deleteIngredient(ingredient) {
        return this.http.delete(`/api/ingredients/${ingredient.id}`).subscribe(result => {
            console.log(result)
            this.appService.ingredients$.next(
                this.appService.ingredients$.getValue().filter(ing => ing.id !== ingredient.id)
            );
        })
    }

    editIngredient(ingredient) {
        return this.http.put(`/api/ingredients/${ingredient.id}`, ingredient).subscribe(result => {
            console.log(result)
        })
    }

    createIngredient(ingredient) {
        return this.http.post(`/api/ingredients/create/`, ingredient).pipe(tap(result => {
            let currentIngredients = this.appService.ingredients$.getValue();
            currentIngredients.push(result)
            this.appService.ingredients$.next(currentIngredients)
        }));
    }
}

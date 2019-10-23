import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Recipe } from './core/models/recipe.model';

@Injectable({
    providedIn: "root"
})
export class AppService {
    storeSections$ = new BehaviorSubject<any[]>([]);
    recipes$ = new BehaviorSubject<Recipe[]>([]);
    ingredients$ = new BehaviorSubject<any[]>([]);
    units$ = new BehaviorSubject<any[]>([])
    constructor(private http: HttpClient) { }

    getStoreSections() {
        return this.http.get(`/api/store-sections/`).subscribe(result => {
        })
    }

    getRecipes() {
        return this.http.get<Recipe[]>(`api/recipes/`).subscribe(result => {
            this.recipes$.next(result);
            console.log("got recipes");
        });
    }
    getIngredients() {
        return this.http.get<any[]>(`api/ingredients/`).subscribe(result => {
            this.ingredients$.next(result);
            console.log("got ingredients");
        });
    }

    getUnits() {
        return this.http.get<any[]>(`api/units/`).subscribe(result => {
            // console.log(result)
            this.units$.next(result)
            console.log("got units")
        })
    }


}





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
    unitTypes$ = new BehaviorSubject<any[]>([])
    loading$ = new BehaviorSubject<Boolean>(false);
    constructor(private http: HttpClient) { }

    getStoreSections() {
        this.loading$.next(true);
        return this.http.get<any[]>(`/api/store-sections/`).subscribe(result => {
            this.storeSections$.next(result);
            this.loading$.next(false);
            // console.log("got store sections")
        })
    }

    getIngredients() {
        this.loading$.next(true);
        return this.http.get<any[]>(`api/ingredients/`).subscribe(result => {
            this.ingredients$.next(result);
            this.loading$.next(false);
            // console.log("got ingredients");
        });
    }

    getUnits() {
        this.loading$.next(true);
        return this.http.get<any[]>(`api/units/`).subscribe(result => {
            this.units$.next(result)
            this.loading$.next(false);
            // console.log("got units")
        })
    }

    getUnitTypes() {
        this.loading$.next(true);
        return this.http.get<any[]>(`api/unit-types/`).subscribe(result => {
            this.loading$.next(false);
            this.unitTypes$.next(result);
        })
    }


    getUserMeta() {
        return this.http.get(`api/user/`).subscribe(result => {
            // console.log(result)
        })
    }
    updateUserMeta() {
        return this.http.put(`api/user/`, { viewed_recipes: [1, 2, 3] }).subscribe(result => {
            // console.log(result)
        })
    }


}





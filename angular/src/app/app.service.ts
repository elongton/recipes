import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { Recipe } from './core/models/recipe.model';

@Injectable({
    providedIn: "root"
})
export class AppService {
    storeSections$ = new BehaviorSubject<any[]>([]);
    constructor(private http: HttpClient) { }

    getStoreSections() {
        return this.http.get<any[]>(`/api/store-sections/`).subscribe(result => {
            this.storeSections$.next(result);
            // console.log("got store sections")
        })
    }

}





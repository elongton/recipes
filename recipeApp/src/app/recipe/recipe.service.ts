import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  selectedRecipe$ = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get(`api/recipes/`);
  }

  getRecipe(id) {
    return this.http.get(`api/recipes/${id}`).subscribe(result => {
      this.selectedRecipe$.next(result);
    });
  }

  submitRecipe(recipe) {
    return this.http.post(`api/recipe/`, recipe);
  }
}

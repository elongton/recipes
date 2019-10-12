import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipes$ = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  getRecipes() {
    return this.http.get(`api/recipes/`).subscribe(result => {
      this.recipes$.next(result)
      console.log('got recipes')
    });
  }

  submitRecipe(recipe) {
    return this.http.post(`api/recipe/`, recipe);
  }

  deleteRecipe(recipe) {
    return this.http.delete(`api/recipes/${recipe.id}`).subscribe(result => {
      this.recipes$.next(
        this.recipes$.getValue().filter(r => (r.id !== recipe.id))
      )
    })
  }
}



  // getRecipe(id) {
  //   return this.http.get(`api/recipes/${id}`).subscribe(result => {
  //     // this.selectedRecipe$.next(result);
  //   });
  // }
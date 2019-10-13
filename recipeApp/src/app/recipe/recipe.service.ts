import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

const HttpUploadOptions = {
  headers: new HttpHeaders({ Accept: "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipes$ = new BehaviorSubject(null);
  constructor(private http: HttpClient, private router: Router) {}

  getRecipes() {
    return this.http.get(`api/recipes/`).subscribe(result => {
      this.recipes$.next(result);
      console.log("got recipes");
    });
  }

  submitRecipe(recipe) {
    return this.http.post<any>(`api/recipes/`, recipe, HttpUploadOptions).pipe(
      tap(result => {
        let currentRecipeList = this.recipes$.getValue();
        currentRecipeList.push(result);
        this.recipes$.next(currentRecipeList);
      })
    );
  }

  deleteRecipe(recipe) {
    return this.http.delete(`api/recipes/${recipe.id}`).subscribe(result => {
      this.recipes$.next(
        this.recipes$.getValue().filter(r => r.id !== recipe.id)
      );
    });
  }

  public nagivateToRecipe(id) {
    this.router.navigate(["/recipe/view", id]);
  }
}

// getRecipe(id) {
//   return this.http.get(`api/recipes/${id}`).subscribe(result => {
//     // this.selectedRecipe$.next(result);
//   });
// }

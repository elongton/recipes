import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipes$ = new BehaviorSubject<any[]>([]);
  ingredients$ = new BehaviorSubject<any[]>([]);
  units$ = new BehaviorSubject<any[]>([])
  constructor(private http: HttpClient, private router: Router) { }

  getRecipes() {
    return this.http.get<any[]>(`api/recipes/`).subscribe(result => {
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

  submitRecipe(recipe) {
    return this.http.post<any>(`api/recipes/`, recipe).pipe(
      tap(result => {
        let currentRecipeList = this.recipes$.getValue();
        result.image = result.image.replace(environment.domain, "");
        currentRecipeList.push(result);
        this.recipes$.next(currentRecipeList);
        this.nagivateToRecipe(result.id);
      })
    );
  }
  updateRecipe(recipe, recipeId) {
    return this.http.put<any>(`api/recipes/${recipeId}`, recipe).pipe(
      tap(result => {
        console.log(result)
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

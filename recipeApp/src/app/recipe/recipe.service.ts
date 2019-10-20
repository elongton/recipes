import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, of } from "rxjs";
import { tap, map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipes$ = new BehaviorSubject<Recipe[]>([]);
  ingredients$ = new BehaviorSubject<any[]>([]);
  units$ = new BehaviorSubject<any[]>([])
  constructor(private http: HttpClient, private router: Router) { }

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

  submitRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(`api/recipes/`, recipe).pipe(
      tap(result => {
        this.addRecipeToSubjectAndNavigate(result)
      })
    );
  }
  updateRecipe(recipe: Recipe, recipeId: Number) {
    return this.http.put<Recipe>(`api/recipes/${recipeId}`, recipe).pipe(
      tap(result => {
        this.addRecipeToSubjectAndNavigate(result, true)
      })
    );
  }

  addRecipeToSubjectAndNavigate(result, update?: boolean) {
    let currentRecipeList = this.recipes$.getValue();
    if (result.image) result.image = result.image.replace(environment.domain, "");
    if (update) {
      let updatedRecipeId = currentRecipeList.findIndex(r => { return r.id === result.id })
      currentRecipeList[updatedRecipeId] = result;
    } else {
      currentRecipeList.push(result);
    }
    this.recipes$.next(currentRecipeList);
    this.nagivateToRecipe(result.id);
  }

  updateRecipeSubject(recipe: Recipe) {
    let currentRecipeList = this.recipes$.getValue();
    let updatedRecipeId = currentRecipeList.findIndex(r => { return r.id === recipe.id })
    currentRecipeList[updatedRecipeId] = recipe;
    this.recipes$.next(currentRecipeList);
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

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

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
    return this.http
      .post<any>(
        `api/recipes/`,
        recipe
        // {
        //   reportProgress: true,
        //   observe: "events"
        // }
      )
      .pipe(
        tap(result => {
          // try {
          //   if (result["body"] !== undefined) {
          //     let currentRecipeList = this.recipes$.getValue();
          //     currentRecipeList.push(result["body"]);
          //     this.recipes$.next(currentRecipeList);
          //     this.nagivateToRecipe(result["body"].id);
          //   }
          // } catch (e) {
          //   console.log(e);
          // }
          // console.log(event);

          let currentRecipeList = this.recipes$.getValue();
          result.image = result.image.replace(environment.domain, "");
          currentRecipeList.push(result);
          this.recipes$.next(currentRecipeList);
          this.nagivateToRecipe(result.id);
          // let that = this;
          // setTimeout(function() {
          //   that.nagivateToRecipe(result.id);
          // }, 2000);
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

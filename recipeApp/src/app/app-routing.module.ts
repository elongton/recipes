import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: "", component: RecipeComponent, children: [
      { path: "recipe/view/:recipeId", component: RecipeDetailComponent },
      { path: "recipe/edit/:recipeId", component: RecipeEditComponent },
      { path: "recipe/new", component: RecipeEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

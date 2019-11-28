import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './recipe/shopping-list/shopping-list.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { UnitComponent } from './admin/unit/unit.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "", component: RecipeComponent, canActivate: [AuthGuard], children: [
      { path: "recipe/view/:recipeId", component: RecipeDetailComponent },
      { path: "recipe/edit/:recipeId", component: RecipeEditComponent },
      { path: "recipe/new", component: RecipeEditComponent },
      { path: "shopping-list", component: ShoppingListComponent }
    ]
  },
  { path: "ingredients", component: IngredientComponent },
  { path: "units", component: UnitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

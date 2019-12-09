import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { UnitComponent } from './admin/unit/unit.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';
import { TagComponent } from './admin/tag/tag.component';


import { RecipeResolverService } from './recipe/recipe-resolver.service';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    resolve: [RecipeResolverService]
  },
  {
    path: "recipe/view/:recipeId",
    component: RecipeDetailComponent,
    canActivate: [AuthGuard]
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "recipe-book", component: RecipeBookComponent },
  { path: "meal-planner", component: MealPlannerComponent },

  //admin stuff
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    // runGuardsAndResolvers: 'always'
  },
  {
    path: "recipe/edit/:recipeId",
    component: RecipeEditComponent,
    canActivate: [AuthGuard],
    resolve: [RecipeResolverService]
  },
  {
    path: "recipe/new",
    component: RecipeEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

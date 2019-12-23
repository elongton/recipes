import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './home/home.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';

import { RecipeResolverService } from './recipe/recipe-resolver.service';
import { IngredientResolverService } from './admin/ingredient/ingredient-resolver.service';
import { TagResolverService } from './admin/tag/tag-resolver.service';
import { RefResolverService } from './store/general/ref-resolver.service';
import { UserResolverService } from './user/user-resolver.service'
import { UserRecipeDetailComponent } from './recipe/user-recipe-detail/user-recipe-detail.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: [
      RecipeResolverService,
      IngredientResolverService,
      RefResolverService,
      TagResolverService,
      UserResolverService]
  },

  {
    path: "recipe/view/:recipeId",
    component: RecipeDetailComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: [RecipeResolverService, IngredientResolverService, TagResolverService, UserResolverService]
  },
  {
    path: "user/recipe/view/:recipeId",
    component: UserRecipeDetailComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: [RecipeResolverService, IngredientResolverService, TagResolverService, UserResolverService]
  },


  { path: "shopping-list", component: ShoppingListComponent },
  { path: "meal-planner", component: MealPlannerComponent },

  {
    path: "recipe-book",
    component: RecipeBookComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: [UserResolverService]
  },
  //admin stuff
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    // runGuardsAndResolvers: 'always'
  },
  {
    path: "recipe/edit/:recipeId",
    component: RecipeEditComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: [RecipeResolverService, IngredientResolverService, TagResolverService]
  },
  {
    path: "recipe/new",
    component: RecipeEditComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    resolve: [RecipeResolverService, IngredientResolverService, TagResolverService]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

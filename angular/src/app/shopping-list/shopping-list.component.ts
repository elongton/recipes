import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from 'src/app/core/models/recipe.model';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/shared/helper.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as UserActions from '../user/store/user.actions';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  selectedRecipes: Recipe[] = [];
  userFirstName: string = '';
  recipeSub: Subscription;
  ingredientList: any[];
  recipes: Recipe[] = [];
  storeSections;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>,
    public helper: HelperService, ) { }

  ngOnInit() {
    this.ingredientList = [];
    this.store.select('user').pipe(
      switchMap(user => {
        this.selectedRecipes = JSON.parse(JSON.stringify(user.shoppingList.recipes))
        this.ingredientList = this.shoppingListService.scanRecipeList(this.selectedRecipes);
        return this.store.select('auth');
      }),
      switchMap(auth => {
        this.userFirstName = auth.firstName;
        return this.store.select('general')
      }),
    ).
      subscribe(general => {
        this.storeSections = general.storeSections;
      })
  }

  removeFromShoppingList(recipe) {
    this.store.dispatch(new UserActions.RemoveFromShoppingList(recipe));
  }

  print() {
    window.print()
  }

  ngOnDestroy() {
    // this.recipeSub.unsubscribe();
  }

  clickShoppingListItem(ingredient) {
    ingredient.editing = !ingredient.editing;
    ingredient.edited_value = this.helper.numberToFraction(ingredient.ingredient_quantity) + (ingredient.unit_multiplier > 0 ? ' ' + ingredient.unit : '') + ' ' + ingredient.ingredient_name;
  }
}


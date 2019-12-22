import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../core/models/recipe.model'

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss']
})
export class RecipeBookComponent implements OnInit, OnDestroy {

  storeSub: Subscription;
  userRecipes: Recipe[];

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.storeSub = this.store.select('user').subscribe(user => {
      this.userRecipes = user.recipeBook.recipes;
    })
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

}

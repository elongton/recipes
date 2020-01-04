import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, of, combineLatest } from 'rxjs'
import * as fromApp from '../../../store/app.reducer'
import { Recipe } from '../../../core/models/recipe.model'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  viewedRecipes: {} = {};
  viewedRecipeIds: Number[];
  allRecipes: Recipe[] = []

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    let sub = combineLatest(this.store.select('recipes'), this.store.select('user'));
    this.subscription = sub.subscribe(([recipes, user]) => {
      this.allRecipes = recipes.recipes;
      this.viewedRecipeIds = user.meta.viewed_recipes;
      const filteredRecipes = this.allRecipes.filter(recipe => { return this.viewedRecipeIds.includes(recipe.id) })
      filteredRecipes.forEach(r => {
        this.viewedRecipes[String(r.id)] = r;
      })
      // console.log(this.viewedRecipes)
    })
    // 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

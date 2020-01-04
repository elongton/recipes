import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { Recipe } from '../core/models/recipe.model';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;
  isSearching: boolean = false;
  recipeObservable: Observable<Recipe[]>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.store.select('recipes').subscribe(recipes => {
      this.recipeObservable = of(recipes.recipes)
    })


  }

}

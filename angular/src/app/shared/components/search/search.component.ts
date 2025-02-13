import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe.model';
import { HelperService } from 'src/app/shared/helper.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';



interface SearchResult {
  name: String;
  id: Number;
  type: String;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output('searching') searching = new EventEmitter();
  @Input('recipes') recipeObservable: Observable<Recipe[]>
  @Input('isUserRecipes') isUserRecipes: boolean = false;

  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  ingredients = [];
  selected: string;
  typeAheadQueryList: SearchResult[] = [];
  filterPillArray = [];
  filterTagArray = []
  tagDropdown: boolean = false;
  loading: boolean = false;

  private subscription: Subscription;

  constructor(
    private router: Router,
    private helpers: HelperService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.typeAheadQueryList = [];
    let that = this;
    this.subscription = this.recipeObservable.pipe(switchMap(recipes => {
      this.recipes = recipes;
      this.filteredRecipes = this.recipes;
      this.typeAheadQueryList = this.typeAheadQueryList.filter(e => { return e.type === "Ingredient" })
      this.filteredRecipes.forEach(e => {
        that.typeAheadQueryList.push({ name: e.title, id: e.id, type: "Recipe" });
      })
      return this.store.select('ingredients')
    })).subscribe(ingredients => {
      this.typeAheadQueryList = this.typeAheadQueryList.filter(e => { return e.type === "Recipe" })
      ingredients.ingredients.forEach(e => {
        that.typeAheadQueryList.push({ name: e.name, id: e.id, type: "Ingredient" });
      })
    })

  }
  removeFilter(event) {
    this.filterPillArray.splice(event.index, 1)
    this.filteredRecipes = this.helpers.filterRecipes(this.recipes, this.filterPillArray, this.filterTagArray)
    this.checkIfSearching();
  }
  onSelect(event) {
    if (event.item.type === 'Ingredient') {
      this.filterPillArray.push({ name: event.item.name, id: event.item.id })
      this.filteredRecipes = this.helpers.filterRecipes(this.recipes, this.filterPillArray, this.filterTagArray)
      this.searching.emit(true);
    } else if (event.item.type === 'Recipe') {
      if (this.isUserRecipes) this.router.navigate(['user/recipe/view/', event.item.id])
      else this.router.navigate(['recipe/view/', event.item.id])

    }
    this.selected = ''
  }

  selectedCount() {
    return this.recipes.filter(e => { return e.shoppingListItem == true }).length
  }

  openDropdown() {
    this.tagDropdown = true
  }

  addTagToFilter(tag) {
    this.tagDropdown = false;
    this.filterTagArray.push(tag)
    this.filteredRecipes = this.helpers.filterRecipes(this.recipes, this.filterPillArray, this.filterTagArray)
    this.searching.emit(true);
  }

  removeTag(i) {
    this.filterTagArray.splice(i, 1)
    this.filteredRecipes = this.helpers.filterRecipes(this.recipes, this.filterPillArray, this.filterTagArray)
    this.checkIfSearching();
  }

  checkIfSearching() {
    if (this.filterTagArray.length == 0 && this.filterPillArray.length == 0) {
      this.searching.emit(false);
    }
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

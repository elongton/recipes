import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe.model';
import { HelperService } from 'src/app/shared/helper.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { RefDataService } from 'src/app/store/general/ref-data.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';



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
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  ingredients = [];
  selected: string;
  typeAheadQueryList: SearchResult[] = [];
  filterPillArray = [];
  filterTagArray = []
  tagDropdown: boolean = false;
  sidenav: Boolean = false;
  tagCategories;
  imageUrl: string = environment.url;

  private subscription: Subscription;

  constructor(
    public recipeService: RecipeService,
    public appService: AppService,
    private router: Router,
    private helpers: HelperService,
    public authService: AuthService,
    private ref: RefDataService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ref.lookup$.subscribe(() => {
      this.tagCategories = this.ref.get('tag_category').refArray;
    })

    // this.appService.getTags();
    this.typeAheadQueryList = [];
    let that = this;
    this.subscription = this.store.select('recipes').pipe(switchMap(recipes => {
      this.filteredRecipes = recipes.recipes;
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
  }
  onSelect(event) {
    if (event.item.type === 'Ingredient') {
      this.filterPillArray.push({ name: event.item.name, id: event.item.id })
      this.filteredRecipes = this.helpers.filterRecipes(this.recipes, this.filterPillArray, this.filterTagArray)

    } else if (event.item.type === 'Recipe') {
      this.router.navigate(['recipe/view/', event.item.id])
    }
    this.selected = ''
  }

  //probably needs to go into service...
  onAddRemoveToShoppingList(recipe: Recipe) {
    recipe.shoppingListItem = !recipe.shoppingListItem
    this.recipeService.updateRecipeSubject(recipe)
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
  }

  removeTag(i) {
    this.filterTagArray.splice(i, 1)
    this.filteredRecipes = this.helpers.filterRecipes(this.recipes, this.filterPillArray, this.filterTagArray)
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

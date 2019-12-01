import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe.model';
import { HelperService } from 'src/app/shared/helper.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { RefDataService } from 'src/app/core/services/ref-data.service';



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
export class SearchComponent implements OnInit {
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

  constructor(
    public recipeService: RecipeService,
    public appService: AppService,
    private router: Router,
    private helpers: HelperService,
    public authService: AuthService,
    private ref: RefDataService, ) { }

  ngOnInit() {
    this.ref.lookup$.subscribe(() => {
      this.tagCategories = this.ref.get('tag_category').refArray;
    })
    this.appService.getTags();
    this.typeAheadQueryList = [];
    let that = this;
    this.appService.recipes$.subscribe(result => {
      this.recipes = result;
      console.log(this.recipes)
      this.filteredRecipes = result;
      this.typeAheadQueryList = this.typeAheadQueryList.filter(e => { return e.type === "Ingredient" })
      result.forEach(e => {
        that.typeAheadQueryList.push({ name: e.title, id: e.id, type: "Recipe" });
      })
    });
    this.appService.ingredients$.subscribe(result => {
      this.typeAheadQueryList = this.typeAheadQueryList.filter(e => { return e.type === "Recipe" })
      result.forEach(e => {
        that.typeAheadQueryList.push({ name: e.name, id: e.id, type: "Ingredient" });
      })
    });

  }
  removeFilter(event) {
    this.filterPillArray.splice(event.index, 1)
    this.filteredRecipes = this.helpers.filterRecipes(this.recipes, this.filterPillArray)
  }
  onSelect(event) {
    if (event.item.type === 'Ingredient') {
      this.filterPillArray.push({ name: event.item.name, id: event.item.id })
      this.filteredRecipes = this.helpers.filterRecipes(this.recipes, this.filterPillArray)

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
  }


}

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { Router } from "@angular/router";
import { forkJoin } from 'rxjs';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes = [];
  filteredRecipes = [];
  ingredients = [];
  selected;
  names: any[] = [];
  filterPillArray = [];

  constructor(
    public recipeService: RecipeService,
    private router: Router,
    private helpers: HelperService) { }

  ngOnInit() {
    //could be much better... look into this, maybe ngrx? or some clever thing
    this.names = [];
    let that = this;
    this.recipeService.recipes$.subscribe(result => {
      this.recipes = result;
      this.filteredRecipes = result;
      this.names = this.names.filter(e => { return e.type === "Ingredient" })
      result.forEach(e => {
        that.names.push({ name: e.title, id: e.id, type: "Recipe" });
      })
    });
    this.recipeService.ingredients$.subscribe(result => {
      this.names = this.names.filter(e => { return e.type === "Recipe" })
      result.forEach(e => {
        that.names.push({ name: e.name, id: e.id, type: "Ingredient" });
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
}

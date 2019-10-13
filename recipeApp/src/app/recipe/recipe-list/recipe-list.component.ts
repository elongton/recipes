import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes = [];
  ingredients = [];
  selected;
  names: string[] = [];

  constructor(public recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    //could be much better... look into this, maybe ngrx? or some clever thing
    this.recipeService.recipes$.subscribe(result => {
      this.names = [];
      this.recipes = result;
      this.itemsToAdd();
    });
    this.recipeService.ingredients$.subscribe(result => {
      this.names = [];
      this.ingredients = result;
      this.itemsToAdd();
    });
  }

  spreadContributorsIntoNamesArray(collection, key) {
    let that = this;
    collection.forEach(element => {
      that.names.push(element[key]);
    });
  }
  itemsToAdd() {
    this.spreadContributorsIntoNamesArray(this.ingredients, "name");
    this.spreadContributorsIntoNamesArray(this.recipes, "title");
  }
}

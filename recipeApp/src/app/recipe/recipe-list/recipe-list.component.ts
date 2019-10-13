import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes;
  selected;
  names: string[] = [];

  constructor(public recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.recipeService.recipes$.subscribe(result => {
      this.recipes = result;
      let that = this;
      if (this.recipes) {
        this.recipes.forEach(element => {
          that.names.push(element.title);
        });
      }
    });
  }
}

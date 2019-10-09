import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(result => {
      console.log(result);
      this.recipes = result;
    });
  }

  selectRecipe(recipe) {
    this.recipeService.getRecipe(recipe.id);
  }
}

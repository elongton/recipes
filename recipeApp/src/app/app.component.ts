import { Component, OnInit } from "@angular/core";
import { RecipeService } from "./recipe/recipe.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "recipeApp";
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    console.log("load");
    this.recipeService.getRecipes();
    this.recipeService.getIngredients();
    this.recipeService.getUnits();
  }
}

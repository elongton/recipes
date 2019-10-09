import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe$ = this.recipeService.selectedRecipe$;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}
}

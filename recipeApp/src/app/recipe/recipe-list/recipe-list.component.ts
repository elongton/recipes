import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes$ = this.recipeService.recipes$;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {

  }
}

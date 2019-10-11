import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes;
  selected;
  names: string[] = [];


  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipes$.subscribe(result => {
      this.recipes = result;
      let that = this;
      if (this.recipes) {
        this.recipes.forEach(element => {
          that.names.push(element.title);
        });
      }

    })

  }
}

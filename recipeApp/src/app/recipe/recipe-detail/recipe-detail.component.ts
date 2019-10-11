import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit {
  recipe;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.recipeService.recipes$.subscribe(result => {
      if (result) {
        this.recipe = result.find(x => x.id === Number(recipeId));
        console.log(this.recipe)
      }
    })

  }
}

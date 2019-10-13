import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe;
  recipeSubscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get("recipeId");
    this.recipeSubscription = this.recipeService.recipes$.subscribe(result => {
      if (result) {
        this.recipe = result.find(x => x.id === Number(recipeId));
      }
    });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}

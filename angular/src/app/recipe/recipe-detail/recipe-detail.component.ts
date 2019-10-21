import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from 'src/app/core/models/recipe.model';

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  units;
  recipeSubscription: Subscription;
  unitSubscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get("recipeId");
    this.recipeSubscription = this.recipeService.recipes$.subscribe(result => {
      if (result) {
        this.recipe = result.find(x => x.id === Number(recipeId));
        // console.log(this.recipe)
      }
    });
    this.unitSubscription = this.recipeService.units$.subscribe(result => {
      this.units = result;
    })
  }

  // getIngredientUnit(unitId: Number) {
  //   try {
  //     if (this.units) {
  //       return this.units.find(item => { return item.id == unitId }).name
  //     } else {
  //       return null
  //     }
  //   } catch (e) { }

  // }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.unitSubscription.unsubscribe();
  }
}

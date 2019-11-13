import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from 'src/app/core/models/recipe.model';
import { AppService } from 'src/app/app.service';
import { environment } from "src/environments/environment";
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  imageUrl: string = environment.url;
  recipe: Recipe;
  units;
  recipeSubscription: Subscription;
  unitSubscription: Subscription;
  editingNotes: boolean = false;
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    public helper: HelperService,
  ) { }

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get("recipeId");
    this.recipeSubscription = this.appService.recipes$.subscribe(result => {
      if (result) {
        this.recipe = result.find(x => x.id === Number(recipeId));
      }
    });
    this.unitSubscription = this.appService.units$.subscribe(result => {
      this.units = result;
    })
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.unitSubscription.unsubscribe();
  }


  updateNotes() {
    console.log('works')
  }
}

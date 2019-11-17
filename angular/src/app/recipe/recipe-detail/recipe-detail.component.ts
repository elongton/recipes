import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from "@angular/router";
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
  recipes: Recipe[];
  units;
  recipeSubscription: Subscription;
  unitSubscription: Subscription;
  editingNotes: boolean = false;
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    public helper: HelperService,
    private recipeService: RecipeService,
    private router: Router,
  ) { }

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get("recipeId");
    this.recipeSubscription = this.appService.recipes$.subscribe(result => {
      if (result) {
        this.recipes = result;
        this.recipe = result.find(x => x.id === Number(recipeId));
        // console.log(this.recipe)
      }
    });
    this.unitSubscription = this.appService.units$.subscribe(result => {
      this.units = result;
    })

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        recipeId = this.route.snapshot.paramMap.get("recipeId");
        this.recipe = this.recipes.find(x => x.id === Number(recipeId));
        // console.log(this.recipe)
      }
    });

  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.unitSubscription.unsubscribe();
  }


  updateNotes() {
    let formDataToSend = new FormData();
    formDataToSend.append("fields", JSON.stringify(this.recipe));
    formDataToSend.append("image", '');
    this.recipeService.updateRecipe(formDataToSend, this.recipe.id).subscribe()
  }
}

import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Subscription, of } from "rxjs";
import { Recipe } from 'src/app/core/models/recipe.model';
import { AppService } from 'src/app/app.service';
import { environment } from "src/environments/environment";
import { HelperService } from 'src/app/shared/helper.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap, tap } from 'rxjs/operators';

import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  imageUrl: string = environment.url;
  recipe: Recipe;
  recipes: Recipe[];
  recipeId: Number = null;
  units: any[];
  editingNotes: boolean = false;

  private subscription: Subscription;
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    public helper: HelperService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(map(params => {
      return +params['recipeId'];
    }), switchMap(id => {
      this.recipeId = id;
      return this.store.select('recipes')
    })).subscribe(
      (recipes) => {
        this.recipes = recipes.recipes;
        this.recipe = recipes.recipes.find(recipe => { return recipe.id === this.recipeId })
      }
    )


    // let recipeId = this.route.snapshot.paramMap.get("recipeId");
    // this.recipeSubscription = this.appService.recipes$.subscribe(result => {
    //   this.recipes = result;
    //   this.recipe = result.find(x => x.id === Number(recipeId));
    //   if (!this.recipe) {
    //     this.recipeService.retrieveRecipe(Number(recipeId)).subscribe(result => {
    //       this.recipe = result
    //       this.recipe.image = this.helper.replaceImageUrl(result)
    //     })
    //   }
    //   console.log(this.recipe)
    // });
    // this.unitSubscription = this.appService.units$.subscribe(result => {
    //   this.units = result;
    // })

    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     recipeId = this.route.snapshot.paramMap.get("recipeId");
    //     this.recipe = this.recipes.find(x => x.id === Number(recipeId));
    //     // console.log(this.recipe)
    //   }
    // });

  }

  ngOnDestroy() {
    // this.recipeSubscription.unsubscribe();
    // this.unitSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }


  updateNotes() {
    let formDataToSend = new FormData();
    formDataToSend.append("fields", JSON.stringify(this.recipe));
    formDataToSend.append("image", '');
    this.store.dispatch(new RecipeActions.BeginUpdateRecipe({ recipe: formDataToSend, id: this.recipe.id }))
  }

  addRecipeToShoppingList() {
    this.recipe.shoppingListItem = !this.recipe.shoppingListItem;
  }
}

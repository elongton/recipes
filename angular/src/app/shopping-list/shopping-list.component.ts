import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from 'src/app/core/models/recipe.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { HelperService } from 'src/app/shared/helper.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  selectedRecipes: Recipe[] = [];
  recipeSub: Subscription;
  ingredientList: any[];
  storeSections;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private appService: AppService,
    public helper: HelperService) { }

  ngOnInit() {
    this.ingredientList = [];
    this.appService.storeSections$.subscribe(storeSections => {
      this.storeSections = storeSections;
    })
    // this.recipeSub = this.appService.recipes$.subscribe(recipes => {
    //   this.selectedRecipes = recipes.filter(recipe => { return recipe.shoppingListItem === true })
    //   // if (this.selectedRecipes.length < 1) {
    //   //   this.router.navigate(['/']);
    //   // }
    //   // console.log(this.selectedRecipes)
    //   let selectedRecipes = JSON.parse(JSON.stringify(this.selectedRecipes))
    //   this.ingredientList = this.recipeService.scanRecipeList(selectedRecipes);
    //   // console.log(this.ingredientList)
    // })
  }

  print() {
    window.print()
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

  clickShoppingListItem(ingredient) {
    ingredient.editing = !ingredient.editing;
    ingredient.edited_value = this.helper.numberToFraction(ingredient.ingredient_quantity) + (ingredient.unit_multiplier > 0 ? ' ' + ingredient.unit : '') + ' ' + ingredient.ingredient_name;
  }
}


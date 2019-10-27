import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/app/core/models/recipe.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  selectedRecipes: Recipe[] = [];
  recipeSub: Subscription;
  ingredientList:any[];

  constructor(private recipeService: RecipeService, private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.ingredientList = [];
    this.recipeSub = this.appService.recipes$.subscribe(recipes => {
      this.selectedRecipes = recipes.filter(recipe => { return recipe.shoppingListItem === true })
      if (this.selectedRecipes.length < 1) {
        this.router.navigate(['/']);
      }
      console.log(this.selectedRecipes)
      let selectedRecipes = JSON.parse(JSON.stringify(this.selectedRecipes))
      this.ingredientList = this.recipeService.scanRecipeList(selectedRecipes);
    })
  }


  ngOnDestroy() {
    this.recipeSub.unsubscribe();

  }
}

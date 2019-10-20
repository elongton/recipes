import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  selectedRecipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipes$.subscribe(recipes => {
      this.selectedRecipes = recipes.filter(recipe => { return recipe.shoppingListItem === true })
      console.log(this.selectedRecipes)
    })
  }

  ngOnDestroy() {

  }
}

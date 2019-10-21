import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  selectedRecipes: Recipe[] = [];
  recipeSub: Subscription;

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipeSub = this.recipeService.recipes$.subscribe(recipes => {
      this.selectedRecipes = recipes.filter(recipe => { return recipe.shoppingListItem === true })
      if (this.selectedRecipes.length < 1) {
        this.router.navigate(['/']);
      }
    })
  }



  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }
}

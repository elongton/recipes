import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../core/models/recipe.model';
import { environment } from 'src/environments/environment';

import { RecipeService } from 'src/app/recipe/recipe.service';
import { Router } from '@angular/router';


@Component({
  selector: 'recipe-circle',
  templateUrl: './recipe-circle.component.html',
  styleUrls: ['./recipe-circle.component.scss']
})
export class RecipeCircleComponent implements OnInit {

  @Input('recipe') recipe: Recipe
  @Input('small') small: Boolean = false
  @Input('isUserRecipe') isUserRecipe: boolean = false;
  @Input('truncTitle') truncTitle: boolean = false;
  titleTruncLength: string = '20';
  imageUrl: string = environment.url;
  constructor(public recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
  }

  navigateToRecipe(id) {
    if (this.isUserRecipe) this.router.navigate(["/user/recipe/view", id]);
    else this.router.navigate(["/recipe/view", id]);
  }

}

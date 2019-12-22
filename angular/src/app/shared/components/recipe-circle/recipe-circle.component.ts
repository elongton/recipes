import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../core/models/recipe.model';
import { environment } from 'src/environments/environment';

import { RecipeService } from 'src/app/recipe/recipe.service';


@Component({
  selector: 'recipe-circle',
  templateUrl: './recipe-circle.component.html',
  styleUrls: ['./recipe-circle.component.scss']
})
export class RecipeCircleComponent implements OnInit {

  @Input('recipe') recipe: Recipe
  @Input('small') small: Boolean = false
  imageUrl: string = environment.url;
  constructor(public recipeService: RecipeService, ) { }

  ngOnInit() {
  }

}

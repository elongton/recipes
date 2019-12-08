import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    // this.appService.getRecipes();
    // this.appService.getTags();
    // this.appService.getIngredients();
    // this.appService.getUnits();
    // this.appService.getUnitTypes();
    // this.appService.getStoreSections();
  }

}

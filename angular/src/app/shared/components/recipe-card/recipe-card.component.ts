import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RecipeService } from 'src/app/recipe/recipe.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  constructor(private router: Router, private _location: Location, private recipeService: RecipeService, ) { }


  ngOnInit() {
  }

  goBack() {
    this._location.back();
    // this.router.navigate(['/'])
  }
  goHome() {
    // this._location.back();
    this.router.navigate(['/'])
  }

}

import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get('recipeId');
  }

}

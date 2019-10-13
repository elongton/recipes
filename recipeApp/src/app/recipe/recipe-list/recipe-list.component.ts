import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes = [];
  selected;
  names: string[] = [];

  constructor(public recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipeService.recipes$.subscribe(result => {
      this.names = [];
      this.recipes = result;
      let that = this;
      if (this.recipes) {
        this.recipes.forEach(element => {
          that.names.push(element.title);
        });
      }
    });
    this.recipeService.getIngredients().subscribe(result => {
      console.log(result)
      let that = this;
      if (result.length > 0) {
        result.forEach(element => {
          that.names.push(element.name)
        })
      }
    })
  }
}

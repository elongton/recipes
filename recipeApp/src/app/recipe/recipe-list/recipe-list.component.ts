import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { Router } from "@angular/router";
import { forkJoin } from 'rxjs';

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes = [];
  ingredients = [];
  selected;
  names: any[] = [];
  @ViewChild('test', { static: false }) test: ElementRef;

  filterPillArray = [];

  constructor(public recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    //could be much better... look into this, maybe ngrx? or some clever thing
    this.names = [];
    let that = this;
    this.recipeService.recipes$.subscribe(result => {
      this.recipes = result;
      this.names = this.names.filter(e => { return e.type === "Ingredient" })
      result.forEach(e => {
        that.names.push({ name: e.title, id: e.id, type: "Recipe" });
      })
    });
    this.recipeService.ingredients$.subscribe(result => {
      this.names = this.names.filter(e => { return e.type === "Recipe" })
      result.forEach(e => {
        that.names.push({ name: e.name, id: e.id, type: "Ingredient" });
      })
    });

  }

  removeFilter(index) {
    this.filterPillArray.splice(index, 1)
  }


  onSelect(event) {
    if (event.item.type === 'Ingredient') {
      this.filterPillArray.push(event.item.name)
    } else if (event.item.type === 'Recipe') {
      this.router.navigate(['recipe/view/', event.item.id])
    }
    this.selected = ''
  }
}

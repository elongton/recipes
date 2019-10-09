import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/http.service";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.scss"]
})
export class RecipeListComponent implements OnInit {
  recipes;
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.getRecipes().subscribe(result => {
      console.log(result);
      this.recipes = result;
    });
  }
}

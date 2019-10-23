import { Component, OnInit } from "@angular/core";
import { AppService } from './app.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "recipeApp";
  constructor(private appService: AppService) { }

  ngOnInit() {
    // console.log("load");
    this.appService.getRecipes();
    this.appService.getIngredients();
    this.appService.getUnits();
  }
}

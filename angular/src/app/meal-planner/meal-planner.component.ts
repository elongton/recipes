import { Component, OnInit } from '@angular/core';
import { MealPlannerService } from './meal-planner.service';
import { Store } from '@ngrx/store';
import * as UserActions from '../user/store/user.actions';
import * as fromApp from '../store/app.reducer';
import { switchMap } from 'rxjs/operators';

// import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

export interface PlannedRecipe {
  id: number,
  image: string,
  user_recipe: boolean,
  dates: Date[],
  title: string,
  selected: boolean,
}

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.scss']
})
export class MealPlannerComponent implements OnInit {

  loading: boolean = false;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  dateArray: Date[] = null;

  recipeHoldingArray: PlannedRecipe[] = [];
  plannedRecipes: PlannedRecipe[] = [];

  recipeArray: PlannedRecipe[];
  userRecipeArray: PlannedRecipe[];
  // minMode: BsDatepickerViewMode = 'month';
  // bsConfig: Partial<BsDatepickerConfig>;

  constructor(private mealPlannerService: MealPlannerService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('user').pipe(
      switchMap(user => {
        this.userRecipeArray = user.recipeBook.recipes.map(r => {
          return <PlannedRecipe>{
            id: r.id,
            image: r.image,
            user_recipe: true,
            dates: [],
            title: r.title,
            selected: false,
          }
        });

        this.bsRangeValue = user.mealPlanner.date_range;
        this.updateDateArray();

        return this.store.select('recipes')
      })).subscribe(recipes => {
        this.recipeArray = recipes.recipes.map(r => {
          return <PlannedRecipe>{
            id: r.id,
            image: r.image,
            user_recipe: true,
            dates: [],
            title: r.title,
            selected: false,
          }
        });
      }

      )
    // this.bsConfig = Object.assign({}, {
    //   minMode: this.minMode
    // });
    // this.maxDate.setDate(this.maxDate.getDate() + 7);
    // this.bsRangeValue = [this.bsValue, this.maxDate];
    // console.log(this.bsRangeValue)
  }

  updateDateRange() {
    this.updateDateArray();
    this.store.dispatch(new UserActions.UpdateMealPlanningPeriod(this.bsRangeValue));
    // this.recipeHoldingArray.forEach(r => {
    //   r.selected = false;
    // })
    // this.recipeHoldingArray = [];
  }

  updateDateArray() {
    this.dateArray = this.mealPlannerService.getDates(this.bsRangeValue[0], this.bsRangeValue[1])
  }


  addToHolding(recipe) {

    if (this.recipeHoldingArray.includes(recipe)) {
      recipe.selected = false;
      this.recipeHoldingArray = this.recipeHoldingArray.filter(r => {
        return r.id != recipe.id
      })
    } else {
      recipe.selected = true;
      this.recipeHoldingArray.push(recipe);
    }
  }

  outputDate(date) {
    this.recipeHoldingArray.forEach(r => {
      r.dates.push(date)
    })
    this.plannedRecipes = [...this.plannedRecipes, ...this.recipeHoldingArray]
    console.log(this.plannedRecipes)
  }

  dateIncluded(dates: Date[], listDate: Date) {
    return dates.includes(listDate)
  }

}

import { Component, OnInit } from '@angular/core';
import { MealPlannerService } from './meal-planner.service';
import { Store } from '@ngrx/store';
import * as UserActions from '../user/store/user.actions';
import * as fromApp from '../store/app.reducer';
import { switchMap, take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

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

  private userRecipeSub: Subscription

  constructor(private mealPlannerService: MealPlannerService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.userRecipeSub = this.store.select('user').subscribe(user => {
      this.userRecipeArray = user.recipeBook.recipes.map(r => {
        return <PlannedRecipe>{
          id: r.id,
          image: r.image,
          user_recipe: true,
          dates: [],
          title: r.title,
          selected: false,
        }
      })
      if (this.userRecipeArray.length > 0 && this.userRecipeSub) {
        this.userRecipeSub.unsubscribe();
      }
    });


    // this.store.select('recipes').pipe(take(10), tap(
    //   recipes => {
    //     this.recipeArray = recipes.recipes.map(r => {
    //       return <PlannedRecipe>{
    //         id: r.id,
    //         image: r.image,
    //         user_recipe: false,
    //         dates: [],
    //         title: r.title,
    //         selected: false,
    //       }
    //     });
    //   }
    // ));

    this.store.select('user').subscribe(
      user => {
        if (user.mealPlanner.date_range[0] && user.mealPlanner.date_range[1]) {
          this.bsRangeValue = Object.assign(user.mealPlanner.date_range)
        }
        this.plannedRecipes = JSON.parse(JSON.stringify(user.mealPlanner.recipes));
        // console.log(user.mealPlanner.date_range)
        this.updateDateArray();
      })
  }

  updateDateRange() {
    this.updateDateArray();
    this.store.dispatch(new UserActions.UpdateMealPlanningPeriod(this.bsRangeValue));
  }

  updateDateArray() {
    if (this.bsRangeValue) this.dateArray = this.mealPlannerService.getDates(this.bsRangeValue[0], this.bsRangeValue[1])
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
    // console.log(this.recipeHoldingArray)
  }

  removeDateFromRecipe(recipe, date) {
    let minmax = this.getMinMaxDate(date.begin);
    let dd = null
    recipe.dates = recipe.dates.filter(d => {
      dd = new Date(d);
      if (dd > minmax.max || dd < minmax.min) {
        return true
      } else { return false }
    })
    this.updatePlannedrecipes();
  }

  addDateToSelectedRecipes(date) {
    this.recipeHoldingArray.forEach(r => {
      console.log('trying to push a date')
      r.dates.push(date)
    })
    this.recipeHoldingArray.forEach(r => {
      let recipeToUpdate = this.plannedRecipes.find(pr => { return pr.id == r.id });
      if (recipeToUpdate) {
        if (!this.dateIncluded(recipeToUpdate.dates, date)) {
          recipeToUpdate.dates.push(date)
        }
      }
      else {
        console.log('pushed')
        this.plannedRecipes.push(r)
      }
    })
    this.updatePlannedrecipes();
  }


  dateIncluded(dates: Date[], listDate: Date) {
    let included = false;
    let minmax = this.getMinMaxDate(listDate);
    dates.forEach(d => {
      let dd = new Date(d);
      if (dd < minmax.max && dd > minmax.min) { included = true }
    })
    // console.log(included)
    return included
  }

  getMinMaxDate(listDate) {
    let min = new Date(new Date(listDate).getTime() - 60 * 60 * 24 * 1000)
    let max = new Date(new Date(listDate).getTime() + 60 * 60 * 24 * 1000)
    return { min: min, max: max }
  }


  updatePlannedrecipes() {
    this.store.dispatch(new UserActions.UpdatedPlannedMealsArray(JSON.parse(JSON.stringify(this.plannedRecipes))));
  }

  clearSelected() {
    this.recipeHoldingArray.map(r => { r.selected = false; })
    this.recipeHoldingArray = [];
  }

}

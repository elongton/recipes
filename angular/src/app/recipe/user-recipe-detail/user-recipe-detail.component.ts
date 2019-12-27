import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/core/models/recipe.model';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
import { Store } from '@ngrx/store';
import { HelperService } from 'src/app/shared/helper.service';

import * as fromApp from '../../store/app.reducer';
import * as UserActions from '../../user/store/user.actions'

@Component({
  selector: 'app-user-recipe-detail',
  templateUrl: './user-recipe-detail.component.html',
  styleUrls: ['./user-recipe-detail.component.scss']
})
export class UserRecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  recipeId: Number = null;
  userRecipeBook: any = []
  updating: boolean = false;
  imageUrl: string = environment.url;
  editingIngredients: boolean = false;
  editingInstructions: boolean = false;
  editedInstructions = [];
  editedIngredientSections = [];
  editedNotes: string = '';
  editingNotes: boolean = false;

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    public helper: HelperService,
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(map(params => {
      return +params['recipeId'];
    }), switchMap(id => {
      this.recipeId = id;
      return this.store.select('user')
    })).subscribe(user => {
      this.userRecipeBook = user.recipeBook.recipes;
      this.updating = user.updating;
      this.recipe = this.userRecipeBook.find((recipe: Recipe) => { return recipe.id === this.recipeId })
    })
  }

  onEditIngredients() {
    this.editedIngredientSections = JSON.parse(JSON.stringify(this.recipe.ingredient_sections));
    this.editingIngredients = true;
  }
  onSaveIngredients() {
    let recipe = {
      ...this.recipe,
      ingredient_sections: this.editedIngredientSections
    }
    this.store.dispatch(new UserActions.BeginUpdateRecipeBook(recipe))
    this.editingIngredients = false;
  }


  onEditInstructions() {
    this.editedInstructions = JSON.parse(JSON.stringify(this.recipe.steps))
    this.editingInstructions = true;
  }
  onSaveInstructions() {
    let recipe = {
      ...this.recipe,
      steps: this.editedInstructions
    }
    this.store.dispatch(new UserActions.BeginUpdateRecipeBook(recipe))
    this.editingInstructions = false;
  }



  onEditNotes() {
    this.editedNotes = JSON.parse(JSON.stringify(this.recipe.notes))
    this.editingNotes = true;
  }
  onSaveNotes() {
    let recipe = {
      ...this.recipe,
      notes: this.editedNotes
    }
    this.store.dispatch(new UserActions.BeginUpdateRecipeBook(recipe))
    this.editingNotes = false;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

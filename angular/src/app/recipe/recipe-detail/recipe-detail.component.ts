import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Subscription, of } from "rxjs";
import { Recipe } from 'src/app/core/models/recipe.model';
import { environment } from "src/environments/environment";
import { HelperService } from 'src/app/shared/helper.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap, tap } from 'rxjs/operators';

import * as RecipeActions from '../store/recipe.actions';
import * as UserActions from '../../user/store/user.actions'
import { RecipeService } from '../recipe.service';

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  imageUrl: string = environment.url;
  recipe: Recipe;
  recipes: Recipe[];
  recipeId: Number = null;
  units: any[];
  editingNotes: boolean = false;
  userRecipeBook: any = []
  userShoppingList: any = [];
  isInShoppingList: boolean = false;
  isInRecipeBook: boolean = false;

  private subscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    public helper: HelperService,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(map(params => {
      return +params['recipeId'];
    })
      , switchMap(id => {
        this.recipeId = id;
        return this.store.select('user')
      })
      , switchMap(user => {
        this.userShoppingList = user.shoppingList
        this.userRecipeBook = user.recipeBook;
        this.isInRecipeBook = this.recipeService.checkIfInRecipeBook(this.userRecipeBook, this.recipeId);
        this.isInShoppingList = this.recipeService.checkIfInShoppingList(this.userShoppingList, this.recipeId);
        return this.store.select('recipes')
      })
    ).subscribe(
      (recipes) => {
        this.recipes = recipes.recipes;
        this.recipe = recipes.recipes.find(recipe => { return recipe.id === this.recipeId })
      }
    )

  }

  updateNotes() {
    let formDataToSend = new FormData();
    formDataToSend.append("fields", JSON.stringify(this.recipe));
    formDataToSend.append("image", '');
    this.store.dispatch(new RecipeActions.BeginUpdateRecipe({ recipe: formDataToSend, id: this.recipe.id }))
  }

  addRecipeToShoppingList() {
    this.recipe.shoppingListItem = !this.recipe.shoppingListItem;
  }

  addRecipeToRecipeBook() {
    if (this.isInRecipeBook) {
      this.router.navigate(['user/recipe/view/' + this.recipeId])
    } else {
      this.store.dispatch(new UserActions.AddToRecipeBook(this.recipe))
    }
    // console.log(this.recipe)
  }

  addToShoppingList() {
    if (this.isInShoppingList) {
      this.router.navigate(['/shopping-list'])
    } else {
      this.store.dispatch(new UserActions.AddToShoppingList(this.recipe))
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

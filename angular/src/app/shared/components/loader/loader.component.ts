import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer'
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  styleUrls: ['./loader.component.scss'],
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit, OnDestroy {

  @Output('loading') loadingEmit: EventEmitter<Boolean> = new EventEmitter();
  loading: Boolean = false;
  subscription: Subscription;

  tagsLoading: Boolean;
  recipesLoading: Boolean;
  ingredientsLoading: Boolean;
  generalLoading: Boolean;
  unitsLoading: Boolean;
  userLoading: Boolean;

  constructor(private store: Store<fromApp.AppState>, ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingredients').pipe(
      switchMap(ingredients => {
        this.ingredientsLoading = ingredients.loading;
        return this.store.select('recipes')
      }),
      switchMap(recipes => {
        this.recipesLoading = recipes.loading;
        return this.store.select('general')
      }),
      switchMap(general => {
        this.generalLoading = general.loading;
        return this.store.select('user')
      }),
      switchMap(user => {
        this.userLoading = user.loading;
        return this.store.select('units')
      }),
      switchMap(units => {
        this.unitsLoading = units.loading;
        return this.store.select('tags')
      })
    ).subscribe(tags => {
      this.tagsLoading = tags.loading;
      this.loading
        = this.tagsLoading
        || this.ingredientsLoading
        || this.recipesLoading
        || this.generalLoading
        || this.unitsLoading
        || this.userLoading;
      this.loadingEmit.emit(this.loading)
    })

  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

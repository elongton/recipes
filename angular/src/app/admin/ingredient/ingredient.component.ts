import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditIngredientModalComponent } from '../../shared/components/edit-ingredient-modal/edit-ingredient-modal.component';
import * as fromApp from '../../store/app.reducer'
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient.model';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as IngredientActions from './store/ingredient.actions';


@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  query: String;
  sidenav: Boolean;
  loading: boolean = false;
  subscription: Subscription;

  ingredients: Ingredient[]
  general$ = this.store.select('general')
  constructor(
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>) { }


  ngOnInit() {
    this.subscription = this.store.select('ingredients').pipe(tap(
      (ingredients) => {
        this.ingredients = ingredients.ingredients;
      })
    ).subscribe();
  }

  bsModalRef: BsModalRef;
  openNewIngredientModal() {
    this.bsModalRef = this.modalService.show(EditIngredientModalComponent);
  }

  deleteIngredient(id: Number) {
    this.store.dispatch(new IngredientActions.BeginDeleteIngredient(id));
  }

  createIngredient(ingredient) {
    console.log(ingredient)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

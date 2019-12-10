import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { IngredientService } from './ingredient.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../../app.service';
import { EditIngredientModalComponent } from '../../shared/components/edit-ingredient-modal/edit-ingredient-modal.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/core/models/ingredient.model';
@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit, OnDestroy {
  modalRef: BsModalRef;
  query: String;
  sidenav: Boolean;

  subscription: Subscription;

  ingredients: Ingredient[]


  unitTypes$ = this.appService.unitTypes$;
  storeSections$ = this.appService.storeSections$;
  constructor(
    public ingredientService: IngredientService,
    private modalService: BsModalService,
    private appService: AppService,
    private store: Store<fromApp.AppState>) { }


  ngOnInit() {
    this.subscription = this.store.select('ingredients').subscribe(ingredients => {
      this.ingredients = ingredients.ingredients;
    })
  }

  bsModalRef: BsModalRef;
  openNewIngredientModal() {
    this.bsModalRef = this.modalService.show(EditIngredientModalComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

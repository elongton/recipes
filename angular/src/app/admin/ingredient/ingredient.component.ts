import { Component, OnInit, TemplateRef } from '@angular/core';
import { IngredientService } from './ingredient.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../../app.service';
import { EditIngredientModalComponent } from '../../shared/components/edit-ingredient-modal/edit-ingredient-modal.component';
@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
  modalRef: BsModalRef;
  query: String;
  sidenav: Boolean;
  ingredients$ = this.appService.ingredients$;
  unitTypes$ = this.appService.unitTypes$;
  storeSections$ = this.appService.storeSections$;
  constructor(
    public ingredientService: IngredientService,
    private modalService: BsModalService,
    private appService: AppService, ) { }


  ngOnInit() {
    // this.appService.getIngredients();
  }

  bsModalRef: BsModalRef;
  openNewIngredientModal() {
    this.bsModalRef = this.modalService.show(EditIngredientModalComponent);
  }

}

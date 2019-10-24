import { Component, OnInit, TemplateRef } from '@angular/core';
import { IngredientService } from './ingredient.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../app.service';
@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
  modalRef: BsModalRef;
  ingredients$ = this.appService.ingredients$;
  unitTypes$ = this.appService.unitTypes$;
  storeSections$ = this.appService.storeSections$;
  constructor(
    public ingredientService: IngredientService,
    private modalService: BsModalService,
    private appService: AppService,) { }

  newIngredientName:String = '';
  newIngredientUnitType: Number = null;
  newIngredientStoreSection: Number = null;


  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmitIngredient(){
    let newIngredient = {
      name: this.newIngredientName,
      unit_type: this.newIngredientUnitType,
      store_section: this.newIngredientStoreSection,
    }
    this.ingredientService.createIngredient(newIngredient).subscribe(result => {
      this.modalRef.hide();
      this.newIngredientName =  '';
      this.newIngredientUnitType = null;
      this.newIngredientStoreSection = null;
    })
    // console.log(newIngredient)

  }

}

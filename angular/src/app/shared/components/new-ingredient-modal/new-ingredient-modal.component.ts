import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { IngredientService } from 'src/app/ingredient/ingredient.service';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-new-ingredient-modal',
  templateUrl: './new-ingredient-modal.component.html',
  styleUrls: ['./new-ingredient-modal.component.scss']
})
export class NewIngredientModalComponent implements OnInit {

  newIngredientName: String = '';
  newIngredientUnitType: Number = null;
  newIngredientStoreSection: Number = null;

  ingredients$ = this.appService.ingredients$;
  unitTypes$ = this.appService.unitTypes$;
  storeSections$ = this.appService.storeSections$;

  constructor(
    private appService: AppService,
    public ingredientService: IngredientService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
  }

  onSubmitIngredient() {
    let newIngredient = {
      name: this.newIngredientName,
      unit_type: this.newIngredientUnitType,
      store_section: this.newIngredientStoreSection,
    }
    this.ingredientService.createIngredient(newIngredient).subscribe(result => {
      this.newIngredientName = '';
      this.newIngredientUnitType = null;
      this.newIngredientStoreSection = null;
      this.bsModalRef.hide()
    })
    // console.log(newIngredient)

  }

}

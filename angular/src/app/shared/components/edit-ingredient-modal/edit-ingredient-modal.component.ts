import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { IngredientService } from 'src/app/ingredient/ingredient.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RecipeService } from 'src/app/recipe/recipe.service';


@Component({
  selector: 'app-edit-ingredient-modal',
  templateUrl: './edit-ingredient-modal.component.html',
  styleUrls: ['./edit-ingredient-modal.component.scss']
})
export class EditIngredientModalComponent implements OnInit, AfterViewInit {

  @ViewChild('ingredient', { static: true }) ingredientChild: ElementRef
  newIngredientName: String = '';
  newIngredientUnitType: Number = null;
  newIngredientStoreSection: Number = null;

  ingredients$ = this.appService.ingredients$;
  unitTypes$ = this.appService.unitTypes$;
  storeSections$ = this.appService.storeSections$;

  editRecipeIngredientIndex;
  constructor(
    private appService: AppService,
    public ingredientService: IngredientService,
    public bsModalRef: BsModalRef,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.ingredientChild.nativeElement.focus();
    }, 0)
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
      this.recipeService.elementToFocus$.next({ index: this.editRecipeIngredientIndex, value: newIngredient.name })
    })
    // console.log(newIngredient)

  }

}

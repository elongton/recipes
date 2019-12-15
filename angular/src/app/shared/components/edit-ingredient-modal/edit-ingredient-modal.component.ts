import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { IngredientService } from 'src/app/admin/ingredient/ingredient.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-edit-ingredient-modal',
  templateUrl: './edit-ingredient-modal.component.html',
  styleUrls: ['./edit-ingredient-modal.component.scss']
})
export class EditIngredientModalComponent implements OnInit, AfterViewInit {
  @ViewChildren('name') childChildren: QueryList<ElementRef>;
  ingredientForm: FormGroup;
  general$ = this.store.select('general');
  units$ = this.store.select('units')
  ingredientIndex: number;
  section: any;
  newIngredientName: string;

  constructor(
    public ingredientService: IngredientService,
    public bsModalRef: BsModalRef,
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.buildForm();
    if (this.newIngredientName) {
      this.ingredientForm.patchValue({
        name: this.newIngredientName,
      });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.childChildren.first.nativeElement.focus();
    }, 0)
  }

  buildForm() {
    this.ingredientForm = this.formBuilder.group({
      name: "",
      store_section: "",
      unit_types: [],
    });
  }

  onSubmitIngredient() {
    console.log(this.ingredientForm.value)
    // this.ingredientService.createIngredient(this.ingredientForm.value).subscribe(result => {
    //   this.bsModalRef.hide()
    //   this.recipeService.elementToFocus$.next({ ingredientIndex: this.ingredientIndex, section: this.section, ingredientName: this.ingredientForm.value.name })
    // })
  }
}

import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AppService } from 'src/app/app.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditIngredientModalComponent } from 'src/app/shared/components/edit-ingredient-modal/edit-ingredient-modal.component';
import { take } from 'rxjs/operators';

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.scss"]
})
export class RecipeEditComponent implements OnInit, AfterViewInit {
  @ViewChildren('ingredient') childChildren: QueryList<ElementRef>;
  recipeForm: FormGroup;
  recipeToEdit;
  selectedFile: File;
  ingredientList = [];
  unitList = [];
  uploadedImage;
  ingredients;
  steps;
  bsModalRef: BsModalRef;

  constructor(
    private recipeService: RecipeService,
    private appService: AppService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.childChildren.changes.subscribe(children => {
      try {
        if (children.last.nativeElement.value == null || children.last.nativeElement.value == '') {
          children.last.nativeElement.focus();
        }
      } catch (e) { }
      this.cdr.detectChanges();
    })
  }
  ngOnInit() {
    this.buildForm();
    this.appService.ingredients$.subscribe(result => {
      this.ingredientList = result;
      if (!this.ingredients) {
        this.populateForm();
      }
    });
    this.recipeService.elementToFocus$.subscribe((val: any) => {
      this.onBlurIngredient(val.value, val.index)
      this.childChildren.last.nativeElement.focus();
    })

  }

  populateForm() {
    let recipeId = this.route.snapshot.paramMap.get("recipeId");
    if (recipeId) { //if editing a recipe
      let currentRecipeList = this.appService.recipes$.getValue();
      this.recipeToEdit = currentRecipeList.find(r => r.id == Number(recipeId))
      if (this.recipeToEdit) {
        this.recipeToEdit.ingredients.forEach(element => {
          this.addIngredient();
        });
        this.recipeToEdit.steps.forEach(element => {
          this.addStep();
        });
        try {
          this.ingredients = this.recipeForm.get("ingredients") as FormArray;
          for (let i = 0; i < this.ingredients.length; i++) {
            this.ingredients.at(i).patchValue({
              unitList: this.generateUnitList(this.recipeToEdit.ingredients[i].id),
              id: Number(this.recipeToEdit.ingredients[i].id),
              unit_id: this.recipeToEdit.ingredients[i].unit_id,
              ingredientName: this.recipeToEdit.ingredients[i].name,
            });
          }
        } catch (e) { }

        if (this.recipeToEdit.image) {
          this.uploadedImage = environment.url + this.recipeToEdit.image;
        }
        this.recipeForm.patchValue(this.recipeToEdit)
      }
    }
  }

  buildForm() {
    this.recipeForm = this.formBuilder.group({
      title: "",
      description: "",
      ingredients: this.formBuilder.array([]),
      steps: this.formBuilder.array([]),
      notes: ''
    });
  }
  createIngredient(): FormGroup {
    return this.formBuilder.group({
      id: "",
      ingredientName: "",
      quantity: "",
      unit_id: "",
      notes: "",
      unitList: [],
    });
  }
  createStep(index): FormGroup {
    return this.formBuilder.group({
      number: index,
      instruction: ""
    });
  }
  addIngredient(): void {
    this.ingredients = this.recipeForm.get("ingredients") as FormArray;
    this.ingredients.push(this.createIngredient());
    // console.log(this.ingredients.at(this.ingredients.length - 1).controls.ingredientName)
  }
  addStep(): void {
    this.steps = this.recipeForm.get("steps") as FormArray;
    this.steps.push(this.createStep(this.steps.length + 1));
  }

  removeIngredient(i): void {
    console.log(i)
    this.ingredients = this.recipeForm.get("ingredients") as FormArray;
    this.ingredients.removeAt(i);
  }
  removeStep(i): void {
    this.steps = this.recipeForm.get("steps") as FormArray;
    //this could probably be better...
    for (let j = i + 1; j < this.steps.value.length; j++) {
      this.steps.value[j].number = this.steps.value[j].number - 1;
    }
    this.steps.removeAt(i);
  }

  submit() {
    // console.log(this.recipeForm.value);
    let formDataToSend = new FormData();
    formDataToSend.append("fields", JSON.stringify(this.recipeForm.value));
    if (this.selectedFile) {
      //if user uploads a new image, backend uploads and replaces
      try {
        formDataToSend.append("image", this.selectedFile, this.selectedFile.name);
      } catch (e) {
        console.log(e)
      }
    } else {
      //if user doesn't change image, nothing is sent, and backend retains existing image
      formDataToSend.append("image", '');
    }

    console.log(formDataToSend)
    console.log(this.recipeForm.value)
    if (this.recipeToEdit) {
      this.recipeService.updateRecipe(formDataToSend, this.recipeToEdit.id).subscribe();
    } else {
      this.recipeService.submitRecipe(formDataToSend).subscribe();
    }
  }

  onFileChanged(event, uploadedImage?) {
    if (uploadedImage) {
      this.selectedFile = uploadedImage;
    } else {
      this.selectedFile = event.target.files[0];
    }
    let reader = new FileReader();
    let that = this;
    reader.onload = function (e) {
      that.uploadedImage = e.target["result"];
    };
    reader.readAsDataURL(this.selectedFile);
  }

  checkIfIngredient(i) {
    return this.recipeForm.controls.ingredients.value[i].id ? true : false
  }

  generateUnitList(id) {
    let ingredient = this.ingredientList.find(ing => { return ing.id === id })
    let unitList = []
    if (ingredient) {
      ingredient.unit_types.forEach(unitType => {
        unitType.units.forEach(unit => {
          unitList.push({ name: unit.name, id: unit.id })
        });
      });
    }
    return unitList;
  }

  onTypeAheadIngredient(id, i) {
    let unitList = this.generateUnitList(id);
    this.ingredients.at(i).patchValue({
      id: id,
      unitList: unitList,
      unit_id: unitList[0].id,
    });
  }

  onBlurIngredient(value, i) {
    let found = this.ingredientList.find(ingredient => { return ingredient.name === value })
    if (found) {
      this.onTypeAheadIngredient(found.id, i)
    } else {
      this.ingredients.at(i).patchValue({
        id: null
      });
      if (value != '') {
        this.openNewIngredientModal(event, i)
      }
      console.log('not found')
    }
  }

  openNewIngredientModal(event, i) {
    const initialState = {
      newIngredientName: event.target.value,
      editRecipeIngredientIndex: i,
    };
    this.bsModalRef = this.modalService.show(EditIngredientModalComponent, Object.assign({ initialState }));
  }


}

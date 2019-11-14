import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AppService } from 'src/app/app.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditIngredientModalComponent } from 'src/app/shared/components/edit-ingredient-modal/edit-ingredient-modal.component';

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
  ingredientSections;
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
    // this.childChildren.changes.subscribe(children => {
    //   try {
    //     if (children.last.nativeElement.value == null || children.last.nativeElement.value == '') {
    //       children.last.nativeElement.focus();
    //     }
    //   } catch (e) { }
    //   this.cdr.detectChanges();
    // })
  }
  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get("recipeId");
    this.buildForm();
    if (!recipeId) {
      this.addIngredientSection('General');
    }
    this.appService.ingredients$.subscribe(result => {
      this.ingredientList = result;
      if (recipeId) {
        this.populateForm(recipeId);
      }
    });
    this.recipeService.elementToFocus$.subscribe((val: any) => {
      this.onBlurIngredient(val.ingredientName, val.section, val.ingredientIndex)
      this.childChildren.last.nativeElement.focus();
    })
  }

  populateForm(recipeId) {
    let currentRecipeList = this.appService.recipes$.getValue();
    this.recipeToEdit = currentRecipeList.find(r => r.id == Number(recipeId))
    if (this.recipeToEdit) {
      this.recipeToEdit.ingredient_sections.forEach(section => {
        let tempSection = this.addIngredientSection();
        section.ingredients.forEach(() => {
          this.addIngredient(tempSection);
        });
      });
      this.recipeToEdit.steps.forEach(element => {
        this.addStep();
      });
      try {
        let sections = this.recipeForm.get("ingredient_sections") as FormArray
        for (let i = 0; i < sections.length; i++) {
          let ingredients = sections.at(i).get("ingredients") as FormArray
          for (let j = 0; j < ingredients.length; j++) {
            let updateObject = this.recipeToEdit.ingredient_sections[i].ingredients[j];
            ingredients.at(j).patchValue({
              unitList: this.generateUnitList(updateObject.id),
              id: Number(updateObject.id),
              unit_id: updateObject.unit_id,
              ingredientName: updateObject.name,
            })
          }
        }
      } catch (e) { }

      if (this.recipeToEdit.image) {
        this.uploadedImage = environment.url + this.recipeToEdit.image;
      }
      this.recipeForm.patchValue(this.recipeToEdit)
    }
  }

  buildForm() {
    this.recipeForm = this.formBuilder.group({
      title: "",
      description: "",
      ingredient_sections: this.formBuilder.array([]),
      steps: this.formBuilder.array([]),
      notes: ''
    });
  }
  createIngredientSection(name?: string): FormGroup {
    return this.formBuilder.group({
      name: name ? name : "",
      ingredients: this.formBuilder.array([]),
    })
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
  addIngredientSection(name?: string) {
    let ingredientSections = (this.recipeForm.get("ingredient_sections") as FormArray)
    ingredientSections.push(this.createIngredientSection(name));
    return ingredientSections.at(ingredientSections.length - 1)
  }
  addIngredient(section): void {
    section.get("ingredients").push(this.createIngredient());
  }
  addStep(): void {
    this.steps = this.recipeForm.get("steps") as FormArray;
    this.steps.push(this.createStep(this.steps.length + 1));
  }
  removeSection(sectionIndex): void {
    (this.recipeForm.get("ingredient_sections") as FormArray).removeAt(sectionIndex);
  }
  removeIngredient(section, ingredientIndex): void {
    section.get("ingredients").removeAt(ingredientIndex)
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

  checkIfIngredient(section, ingredientIndex) {
    return section.get("ingredients").at(ingredientIndex).value.id ? true : false
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

  onTypeAheadIngredient(ingredientId: number, section, ingredientIndex: number) {
    let unitList = this.generateUnitList(ingredientId);
    section.get("ingredients").at(ingredientIndex).patchValue({
      id: ingredientId,
      unitList: unitList,
      unit_id: unitList[0].id,
    });
    // console.log(section.get("ingredients"))
  }

  onBlurIngredient(ingredientName: string, section, ingredientIndex: number) {
    let found = this.ingredientList.find(ingredient => { return ingredient.name === ingredientName })
    if (found) {
      this.onTypeAheadIngredient(found.id, section, ingredientIndex)
    } else {
      section.get("ingredients").at(ingredientIndex).patchValue({
        id: null
      });
      if (ingredientName != '') {
        this.openNewIngredientModal(event, section, ingredientIndex)
      }
      console.log('not found')
    }
  }

  openNewIngredientModal(event, section, ingredientIndex) {
    const initialState = {
      newIngredientName: event.target.value,
      ingredientIndex: ingredientIndex,
      section: section,
    };
    this.bsModalRef = this.modalService.show(EditIngredientModalComponent, Object.assign({ initialState }));
  }


}

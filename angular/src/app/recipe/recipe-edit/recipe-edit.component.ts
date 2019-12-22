import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { environment } from "src/environments/environment";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditIngredientModalComponent } from 'src/app/shared/components/edit-ingredient-modal/edit-ingredient-modal.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { HelperService } from 'src/app/shared/helper.service';


import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions'
import { Subscription, of } from 'rxjs';
import { map, switchMap, concatMap } from 'rxjs/operators';


interface TagSelect {
  name: string, id: number, tag_type: string
}

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.scss"]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  // @ViewChildren('ingredient') childChildren: QueryList<ElementRef>;
  recipeForm: FormGroup;
  recipeToEdit;
  recipeId: Number = null;
  selectedFile: File;
  ingredients = [];
  tags = [];
  recipes = [];
  unitList = [];
  uploadedImage;
  ingredientSections;
  steps;
  bsModalRef: BsModalRef;
  populated: boolean = false;
  selectedTag;
  selectedTagArray: TagSelect[] = [];
  loading: boolean = false;


  private subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private imageCompress: NgxImageCompressService,
    private helpers: HelperService,
    private store: Store<fromApp.AppState>
  ) { }


  ngOnInit() {
    this.buildForm();
    this.subscription = this.route.params.pipe(map(params => {
      return params['recipeId'];
    }), switchMap(id => {
      this.recipeId = id;
      return this.store.select('recipes')
    }), switchMap(recipes => {
      this.recipes = recipes.recipes;
      return this.store.select('ingredients')
    }), switchMap(ingredients => {
      this.ingredients = ingredients.ingredients;
      return this.store.select('tags')
    })).subscribe(tags => {
      this.tags = tags.tags;
      if (!this.populated
        && this.loading == false
        && this.recipes.length > 0
        && this.ingredients.length > 0
        && this.tags.length > 0
      ) this.populateForm(this.recipeId)
    });

  }
  populateForm(recipeId: Number) {
    console.log('populate')
    if (recipeId) this.populateEditingRecipeForm(recipeId)
    else this.populateNewRecipeForm()
    this.populated = true;
  }
  buildForm() {
    this.recipeForm = this.formBuilder.group({
      title: "",
      description: "",
      tags: "",
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
      ingredient_id: "", //changed from id to ingredient_id
      ingredient_name: "",
      ingredient_quantity: 1,
      recipe_quantity: 1,
      unit_id: "",
      ingredient_notes: "",
      recipe_notes: "",
      is_recipe_as_ingredient: false,
      recipe_id: "",
      recipe_name: "",
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
  switchIngredientToRecipe(ingredient) {
    ingredient.get('is_recipe_as_ingredient').patchValue(!ingredient.get('is_recipe_as_ingredient').value)
  }
  onSelectTag(event) {
    console.log(this.selectedTagArray)
    console.log(event)
    this.selectedTagArray.push(event.item)
    this.selectedTag = '';
  }
  onRemoveTag(event) { this.selectedTagArray.splice(event.index, 1) }

  populateNewRecipeForm() {
    this.addIngredientSection('General');
  }





  // onFileChanged(event, uploadedImage?) {
  //   if (uploadedImage) {
  //     this.selectedFile = uploadedImage;
  //   } else {
  //     this.selectedFile = event.target.files[0];
  //   }
  //   let reader = new FileReader();
  //   let that = this;
  //   reader.onload = function (e) {
  //     that.uploadedImage = e.target["result"];

  //   };
  //   reader.readAsDataURL(this.selectedFile);
  // }

  checkIfIngredient(section, ingredientIndex) {
    return section.get("ingredients").at(ingredientIndex).value.ingredient_id ? true : false
  }

  generateUnitList(id) {
    let ingredient = this.ingredients.find(ing => { return ing.id === id })
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
      ingredient_id: ingredientId,
      unitList: unitList,
      unit_id: unitList[0].id,
    });
  }
  onTypeAheadRecipe(recipeId: number, section, ingredientIndex: number) {
    section.get("ingredients").at(ingredientIndex).patchValue({
      recipe_id: recipeId,
    });
    // console.log(section.get("ingredients").at(ingredientIndex))
  }
  onBlurIngredient(ingredientName: string, section, ingredientIndex: number) {
    let found = this.ingredients.find(ingredient => { return ingredient.name === ingredientName })
    if (found) {
      this.onTypeAheadIngredient(found.id, section, ingredientIndex)
    } else {
      section.get("ingredients").at(ingredientIndex).patchValue({
        id: null
      });
      if (ingredientName != '') {
        this.openNewIngredientModal(event, section, ingredientIndex)
      }
      console.error('not found')
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


  populateEditingRecipeForm(recipeId: Number) {
    console.log('populating existing recipe')
    console.log(this.recipes)

    this.recipeToEdit = this.recipes.find(r => r.id == Number(recipeId))
    // console.log(this.recipeToEdit)
    if (this.recipeToEdit) {
      this.recipeToEdit.ingredient_sections.forEach(section => {
        let tempSection = this.addIngredientSection();
        section.ingredients.forEach(() => {
          this.addIngredient(tempSection);
        });
      });
      this.recipeToEdit.steps.forEach(() => {
        this.addStep();
      });
      let sections = this.recipeForm.get("ingredient_sections") as FormArray
      for (let i = 0; i < sections.length; i++) {
        let ingredients = sections.at(i).get("ingredients") as FormArray
        for (let j = 0; j < ingredients.length; j++) {
          let updateObject = this.recipeToEdit.ingredient_sections[i].ingredients[j];
          ingredients.at(j).patchValue({
            unitList: this.generateUnitList(updateObject.ingredient_id),
            ingredient_id: Number(updateObject.ingredient_id),
            unit_id: updateObject.unit_id,
            ingredient_name: updateObject.ingredient_name,
            ingredient_notes: updateObject.ingredient_notes,
            recipe_notes: updateObject.recipe_notes,
            recipe_name: updateObject.recipe_name,
            recipe_id: updateObject.recipe_id,
            ingredient_quantity: updateObject.ingredient_quantity,
            recipe_quantity: updateObject.recipe_quantity
          })
        }
      }
      this.selectedTagArray = Object.assign([], this.recipeToEdit.tags);
      console.log(this.recipeToEdit.tags)
      if (this.recipeToEdit.image) {
        this.uploadedImage = environment.url + this.recipeToEdit.image;
      }
      this.recipeForm.patchValue(this.recipeToEdit)
    }
  }

  compressFile() {
    // let compressedImage = null;
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));

      this.imageCompress.compressFile(image, orientation, 50, 50).then(
        result => {
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
          this.uploadedImage = result
          this.selectedFile = this.helpers.dataURLtoFile(result, 'image.jpg')
        }
      );
    });
  }

  submit() {
    //patch selectedTag array
    this.recipeForm.get('tags').patchValue(this.selectedTagArray)
    let formPrecursor = {
      recipeForm: this.recipeForm.value,
      image: this.selectedFile,
    }
    this.recipeService.createUpdateRecipe(formPrecursor, this.recipeId)
  }

  ngOnDestroy() { this.subscription.unsubscribe(); }

}




// ngAfterViewInit() {
//   this.recipeService.elementToFocus$.subscribe((val: any) => {
//     this.onBlurIngredient(val.ingredientName, val.section, val.ingredientIndex)
    // this.childChildren.last.nativeElement.focus();
  // })
  // this.childChildren.changes.subscribe(children => {
  //   try {
  //     if (children.last.nativeElement.value == null || children.last.nativeElement.value == '') {
  //       children.last.nativeElement.focus();
  //     }
  //   } catch (e) { }
  //   this.cdr.detectChanges();
  // })
// }



// submit() {
//   //patch selectedTag array
//   this.recipeForm.get('tags').patchValue(this.selectedTagArray)
//   let formDataToSend = new FormData();
//   formDataToSend.append("fields", JSON.stringify(this.recipeForm.value));
//   console.log(this.recipeForm.value)
//   if (this.selectedFile) {
//     //if user uploads a new image, backend uploads and replaces
//     try {
//       formDataToSend.append("image", this.selectedFile, this.selectedFile.name);
//     } catch (e) {
//       console.log(e)
//     }
//   } else {
//     //if user doesn't change image, nothing is sent, and backend retains existing image
//     formDataToSend.append("image", '');
//   }
//   if (this.recipeToEdit) {
//     console.log(this.recipeForm.value)
//     this.recipeService.updateRecipe(formDataToSend, this.recipeToEdit.id).subscribe();
//   } else {
//     this.recipeService.submitRecipe(formDataToSend).subscribe();
//   }
// }
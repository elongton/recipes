import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.scss"]
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  recipeToEdit;
  selectedFile: File;
  ingredientList = [];
  unitList = [];
  uploadedImage;
  ingredients;
  steps;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get("recipeId");
    this.buildForm();
    if (recipeId) {
      this.recipeService.recipes$.subscribe(result => {
        this.recipeToEdit = result.find(r => r.id == Number(recipeId))
        if (this.recipeToEdit) {
          console.log(this.recipeToEdit)
          // console.log(this.recipeToEdit)
          let that = this;
          this.recipeToEdit.ingredients.forEach(element => {
            that.addIngredient();
          });
          this.recipeToEdit.steps.forEach(element => {
            that.addStep();
          });
          this.ingredients = this.recipeForm.get("ingredients") as FormArray;
          for (let i = 0; i < this.ingredients.length; i++) {
            try {
              this.ingredients.at(i).patchValue({
                ingredientId: Number(this.recipeToEdit.ingredients[i].id),
                unitId: this.recipeToEdit.ingredients[i].unit_id
              });
            } catch (e) { }

          }
          this.uploadedImage = environment.backend + this.recipeToEdit.image;
          this.recipeForm.patchValue(this.recipeToEdit)
        }
      })
    }
    this.recipeService.ingredients$.subscribe(result => {
      this.ingredientList = result;
    });
    this.recipeService.units$.subscribe(result => {
      this.unitList = result;
    });
  }

  buildForm() {
    this.recipeForm = this.formBuilder.group({
      title: "",
      description: "",
      ingredients: this.formBuilder.array([]),
      steps: this.formBuilder.array([])
    });
  }

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      ingredientId: "",
      quantity: "",
      unitId: "",
      notes: "",
      id: "",
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
      try {
        formDataToSend.append("image", this.selectedFile, this.selectedFile.name);
      } catch (e) {
        console.log(e)
      }
    } else {
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

  checkIfIngredient(i) {
    return this.recipeForm.controls.ingredients.value[i].ingredientId ? true : false
  }
  getSelectedIngredientUnitType(i) {
    try {
      let ingredientId = this.recipeForm.controls.ingredients.value[i].ingredientId;
      let ingredient = this.ingredientList.filter(u => u.id == ingredientId)[0];
      return ingredient.unit_type
    } catch{ }

  }
}

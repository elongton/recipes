import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";

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
        this.recipeToEdit = result.find(r => r.id == recipeId)
        if (this.recipeToEdit) {
          console.log(this.recipeToEdit)
          let that = this;
          this.recipeToEdit.ingredients.forEach(element => {
            that.addIngredient();
          });
          this.recipeToEdit.steps.forEach(element => {
            that.addStep();
          });
          this.ingredients = this.recipeForm.get("ingredients") as FormArray;
          for (let i = 0; i < this.ingredients.length; i++) {
            this.ingredients.at(i).patchValue({
              ingredientId: this.recipeToEdit.ingredients[i].ingredient.id,
              unitId: this.recipeToEdit.ingredients[i].unit
            });
          }

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
    console.log(this.recipeForm.value);
    let formDataToSend = new FormData();
    formDataToSend.append("fields", JSON.stringify(this.recipeForm.value));
    formDataToSend.append("image", this.selectedFile, this.selectedFile.name);
    this.recipeService.submitRecipe(formDataToSend).subscribe();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
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
    let ingredientId = this.recipeForm.controls.ingredients.value[i].ingredientId;
    let ingredient = this.ingredientList.filter(u => u.id == ingredientId)[0];
    return ingredient.unitType
  }
}

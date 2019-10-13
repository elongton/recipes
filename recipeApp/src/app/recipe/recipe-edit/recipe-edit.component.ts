import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.scss"]
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  selectedFile: File;
  uploadedImage;
  ingredients;
  steps;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get("recipeId");
    this.buildForm();
  }

  buildForm() {
    this.recipeForm = this.formBuilder.group({
      title: "",
      description: "",
      ingredients: this.formBuilder.array([this.createIngredient()]),
      steps: this.formBuilder.array([this.createStep(1)])
    });
  }

  createIngredient(): FormGroup {
    return this.formBuilder.group({
      ingredientId: "",
      quantity: ""
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
    console.log(this.steps);
  }

  removeIngredient(i): void {
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
    let formDataToSend = new FormData();
    formDataToSend.append("fields", JSON.stringify(this.recipeForm.value));
    formDataToSend.append("image", this.selectedFile, this.selectedFile.name);
    this.recipeService.submitRecipe(formDataToSend).subscribe(result => {
      this.recipeService.nagivateToRecipe(result.id);
    });
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = function(e) {
      that.uploadedImage = e.target["result"];
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

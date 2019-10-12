import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { read } from 'fs';
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
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
    private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    let recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.buildForm();
  }

  buildForm() {

    this.recipeForm = this.formBuilder.group({
      title: '',
      description: '',
      ingredients: this.formBuilder.array([this.createIngredient()]),
      steps: this.formBuilder.array([this.createStep()])
    })
  }


  createIngredient(): FormGroup {
    return this.formBuilder.group({
      ingredient: '',
      quantity: '',
    })
  }
  createStep(): FormGroup {
    return this.formBuilder.group({
      instruction: '',
    })
  }

  addIngredient(): void {
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createIngredient());
  }
  addStep(): void {
    this.steps = this.recipeForm.get('steps') as FormArray;
    this.steps.push(this.createStep());
  }

  removeIngredient(i): void {
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    this.ingredients.removeAt(i);
  }
  removeStep(i): void {
    this.steps = this.recipeForm.get('steps') as FormArray;
    this.steps.removeAt(i);
  }


  submit() {
    console.log(this.recipeForm.value)
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = function (e) {
      that.uploadedImage = e.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}

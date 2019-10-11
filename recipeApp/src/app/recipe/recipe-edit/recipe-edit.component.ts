import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
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

}

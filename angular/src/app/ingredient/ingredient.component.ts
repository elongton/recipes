import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredients: any[] = [
    { name: 'chicken', unit_type: 'Poultry' },
    { name: 'salt', unit_type: 'Dry' },
    { name: 'pepper', unit_type: 'Dry' },
    { name: 'tabasco', unit_type: 'Wet' },
  ]
  constructor() { }

  ngOnInit() {
  }

}

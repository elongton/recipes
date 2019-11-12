import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  constructor(private router: Router, ) { }


  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/'])
  }

}

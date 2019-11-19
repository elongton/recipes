import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {

  constructor(private router: Router, private _location: Location, ) { }


  ngOnInit() {
  }

  goBack() {
    this._location.back();
    // this.router.navigate(['/'])
  }
  goHome() {
    // this._location.back();
    this.router.navigate(['/'])
  }

}

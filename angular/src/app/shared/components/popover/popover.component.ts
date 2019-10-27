import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  constructor(private _location: Location, private router: Router,) { }

  ngOnInit() {
  }

  goBack() {
    // this._location.back();
    this.router.navigate(['/'])
  }
}

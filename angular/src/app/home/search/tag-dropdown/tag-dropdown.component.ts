import { Component, OnInit, Input } from '@angular/core';
import { RefDataService } from 'src/app/core/services/ref-data.service';

@Component({
  selector: 'app-tag-dropdown',
  templateUrl: './tag-dropdown.component.html',
  styleUrls: ['./tag-dropdown.component.scss']
})
export class TagDropdownComponent implements OnInit {

  @Input('tagCategories') tagCategories: any;
  constructor(private ref: RefDataService) { }

  ngOnInit() {
    console.log(this.tagCategories)
  }

}

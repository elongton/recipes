import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RefDataService } from 'src/app/store/general/ref-data.service';

@Component({
  selector: 'app-tag-dropdown',
  templateUrl: './tag-dropdown.component.html',
  styleUrls: ['./tag-dropdown.component.scss']
})
export class TagDropdownComponent implements OnInit {

  @Input('tagCategories') tagCategories: any;
  @Input('tags') tags: any;
  @Output('tag') tag = new EventEmitter();
  constructor(private ref: RefDataService) { }

  ngOnInit() {
  }

  emitTag(tag) {
    this.tag.emit(tag)
  }

}

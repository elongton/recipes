import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tag-dropdown',
  templateUrl: './tag-dropdown.component.html',
  styleUrls: ['./tag-dropdown.component.scss']
})
export class TagDropdownComponent implements OnInit {

  @Output('tag') tag = new EventEmitter();
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  emitTag(tag) {
    this.tag.emit(tag)
  }

}

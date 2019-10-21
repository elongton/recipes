import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-pill',
  templateUrl: './filter-pill.component.html',
  styleUrls: ['./filter-pill.component.scss']
})
export class FilterPillComponent implements OnInit {

  @Input('filter') filter;
  @Output() close = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    console.log(this.filter.name)
  }

  onClose() {
    this.close.emit({ index: this.filter.index, id: this.filter.id });
  }

}

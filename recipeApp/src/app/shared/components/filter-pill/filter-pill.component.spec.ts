import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPillComponent } from './filter-pill.component';

describe('FilterPillComponent', () => {
  let component: FilterPillComponent;
  let fixture: ComponentFixture<FilterPillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

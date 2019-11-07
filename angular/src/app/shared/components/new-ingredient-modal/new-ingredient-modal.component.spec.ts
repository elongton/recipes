import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngredientModalComponent } from './new-ingredient-modal.component';

describe('NewIngredientModalComponent', () => {
  let component: NewIngredientModalComponent;
  let fixture: ComponentFixture<NewIngredientModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIngredientModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIngredientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

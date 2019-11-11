import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngredientModalComponent } from './edit-ingredient-modal.component';

describe('NewIngredientModalComponent', () => {
  let component: EditIngredientModalComponent;
  let fixture: ComponentFixture<EditIngredientModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditIngredientModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIngredientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

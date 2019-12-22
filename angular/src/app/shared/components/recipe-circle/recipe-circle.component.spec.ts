import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCircleComponent } from './recipe-circle.component';

describe('RecipeCircleComponent', () => {
  let component: RecipeCircleComponent;
  let fixture: ComponentFixture<RecipeCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

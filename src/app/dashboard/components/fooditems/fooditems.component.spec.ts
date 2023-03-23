import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooditemsComponent } from './fooditems.component';

describe('FooditemsComponent', () => {
  let component: FooditemsComponent;
  let fixture: ComponentFixture<FooditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooditemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

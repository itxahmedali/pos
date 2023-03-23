import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedDiscountComponent } from './created-discount.component';

describe('CreatedDiscountComponent', () => {
  let component: CreatedDiscountComponent;
  let fixture: ComponentFixture<CreatedDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

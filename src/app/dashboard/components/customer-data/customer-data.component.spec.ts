import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDataComponent } from './customer-data.component';

describe('CustomerDataComponent', () => {
  let component: CustomerDataComponent;
  let fixture: ComponentFixture<CustomerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

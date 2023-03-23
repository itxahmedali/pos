import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPayRollComponent } from './staff-pay-roll.component';

describe('StaffPayRollComponent', () => {
  let component: StaffPayRollComponent;
  let fixture: ComponentFixture<StaffPayRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffPayRollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffPayRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

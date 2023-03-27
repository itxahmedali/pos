import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnComponent } from './add-on.component';

describe('AddOnComponent', () => {
  let component: AddOnComponent;
  let fixture: ComponentFixture<AddOnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

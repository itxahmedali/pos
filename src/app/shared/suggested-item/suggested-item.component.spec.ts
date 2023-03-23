import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedItemComponent } from './suggested-item.component';

describe('SuggestedItemComponent', () => {
  let component: SuggestedItemComponent;
  let fixture: ComponentFixture<SuggestedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestedItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

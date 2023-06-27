import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateModalComponent } from './state-modal.component';

describe('StateModalComponent', () => {
  let component: StateModalComponent;
  let fixture: ComponentFixture<StateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateModalComponent]
    });
    fixture = TestBed.createComponent(StateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

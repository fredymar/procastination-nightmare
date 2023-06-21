import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktablesComponent } from './tasktables.component';

describe('TasktablesComponent', () => {
  let component: TasktablesComponent;
  let fixture: ComponentFixture<TasktablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasktablesComponent]
    });
    fixture = TestBed.createComponent(TasktablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainappComponent } from './mainapp.component';

describe('MainappComponent', () => {
  let component: MainappComponent;
  let fixture: ComponentFixture<MainappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainappComponent]
    });
    fixture = TestBed.createComponent(MainappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

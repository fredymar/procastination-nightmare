import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarscontainerComponent } from './barscontainer.component';

describe('BarscontainerComponent', () => {
  let component: BarscontainerComponent;
  let fixture: ComponentFixture<BarscontainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarscontainerComponent]
    });
    fixture = TestBed.createComponent(BarscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

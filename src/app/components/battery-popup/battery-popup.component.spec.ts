import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryPopupComponent } from './battery-popup.component';

describe('BatteryPopupComponent', () => {
  let component: BatteryPopupComponent;
  let fixture: ComponentFixture<BatteryPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatteryPopupComponent]
    });
    fixture = TestBed.createComponent(BatteryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

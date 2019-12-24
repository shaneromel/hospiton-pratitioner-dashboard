import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSlotAppointmentsComponent } from './manage-slot-appointments.component';

describe('ManageSlotAppointmentsComponent', () => {
  let component: ManageSlotAppointmentsComponent;
  let fixture: ComponentFixture<ManageSlotAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSlotAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSlotAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNameComponent } from './patient-name.component';

describe('PatientNameComponent', () => {
  let component: PatientNameComponent;
  let fixture: ComponentFixture<PatientNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

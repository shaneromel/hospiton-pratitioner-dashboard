import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalRegisterComponent } from './hospital-register.component';

describe('HospitalRegisterComponent', () => {
  let component: HospitalRegisterComponent;
  let fixture: ComponentFixture<HospitalRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

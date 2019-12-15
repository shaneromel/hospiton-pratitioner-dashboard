import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteBtnComponent } from './complete-btn.component';

describe('CompleteBtnComponent', () => {
  let component: CompleteBtnComponent;
  let fixture: ComponentFixture<CompleteBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfflineComponent } from './book-offline.component';

describe('BookOfflineComponent', () => {
  let component: BookOfflineComponent;
  let fixture: ComponentFixture<BookOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

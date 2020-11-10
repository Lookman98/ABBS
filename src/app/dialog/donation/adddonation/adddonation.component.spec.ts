import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddonationComponent } from './adddonation.component';

describe('AdddonationComponent', () => {
  let component: AdddonationComponent;
  let fixture: ComponentFixture<AdddonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

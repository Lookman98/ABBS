import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdonationComponent } from './editdonation.component';

describe('EditdonationComponent', () => {
  let component: EditdonationComponent;
  let fixture: ComponentFixture<EditdonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

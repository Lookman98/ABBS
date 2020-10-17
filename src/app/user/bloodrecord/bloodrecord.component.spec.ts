import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodrecordComponent } from './bloodrecord.component';

describe('BloodrecordComponent', () => {
  let component: BloodrecordComponent;
  let fixture: ComponentFixture<BloodrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodrecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

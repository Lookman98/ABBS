import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDonorDialogComponent } from './edonor-dialog.component';

describe('EDonorDialogComponent', () => {
  let component: EDonorDialogComponent;
  let fixture: ComponentFixture<EDonorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EDonorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EDonorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADonorDialogComponent } from './adonor-dialog.component';

describe('ADonorDialogComponent', () => {
  let component: ADonorDialogComponent;
  let fixture: ComponentFixture<ADonorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ADonorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ADonorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

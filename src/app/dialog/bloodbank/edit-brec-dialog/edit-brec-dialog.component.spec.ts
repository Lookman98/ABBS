import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBRecDialogComponent } from './edit-brec-dialog.component';

describe('EditBRecDialogComponent', () => {
  let component: EditBRecDialogComponent;
  let fixture: ComponentFixture<EditBRecDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBRecDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBRecDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

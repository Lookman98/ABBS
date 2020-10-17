import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbloodgroupDialogComponent } from './addbloodgroup-dialog.component';

describe('AddbloodgroupDialogComponent', () => {
  let component: AddbloodgroupDialogComponent;
  let fixture: ComponentFixture<AddbloodgroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbloodgroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbloodgroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

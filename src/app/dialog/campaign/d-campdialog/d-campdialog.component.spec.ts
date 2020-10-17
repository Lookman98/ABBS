import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCampdialogComponent } from './d-campdialog.component';

describe('DCampdialogComponent', () => {
  let component: DCampdialogComponent;
  let fixture: ComponentFixture<DCampdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DCampdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DCampdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

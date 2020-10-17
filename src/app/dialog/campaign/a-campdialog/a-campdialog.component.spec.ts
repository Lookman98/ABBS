import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ACampdialogComponent } from './a-campdialog.component';

describe('ACampdialogComponent', () => {
  let component: ACampdialogComponent;
  let fixture: ComponentFixture<ACampdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ACampdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ACampdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

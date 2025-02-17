import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsAsignacionComponent } from './leads-asignacion.component';

describe('LeadsAsignacionComponent', () => {
  let component: LeadsAsignacionComponent;
  let fixture: ComponentFixture<LeadsAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsAsignacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

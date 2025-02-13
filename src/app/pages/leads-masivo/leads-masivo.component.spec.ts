import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsMasivoComponent } from './leads-masivo.component';

describe('LeadsMasivoComponent', () => {
  let component: LeadsMasivoComponent;
  let fixture: ComponentFixture<LeadsMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsMasivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

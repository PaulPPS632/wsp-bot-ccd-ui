import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasivosComponent } from './masivos.component';

describe('MasivosComponent', () => {
  let component: MasivosComponent;
  let fixture: ComponentFixture<MasivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

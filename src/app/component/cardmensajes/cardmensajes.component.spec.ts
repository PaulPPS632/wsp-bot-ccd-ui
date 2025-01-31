import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardmensajesComponent } from './cardmensajes.component';

describe('CardmensajesComponent', () => {
  let component: CardmensajesComponent;
  let fixture: ComponentFixture<CardmensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardmensajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardmensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBotComponent } from './card-bot.component';

describe('CardBotComponent', () => {
  let component: CardBotComponent;
  let fixture: ComponentFixture<CardBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

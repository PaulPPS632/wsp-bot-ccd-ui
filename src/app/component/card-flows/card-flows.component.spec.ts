import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlowsComponent } from './card-flows.component';

describe('CardFlowsComponent', () => {
  let component: CardFlowsComponent;
  let fixture: ComponentFixture<CardFlowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFlowsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

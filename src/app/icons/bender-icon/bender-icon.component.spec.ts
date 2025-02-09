import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenderIconComponent } from './bender-icon.component';

describe('BenderIconComponent', () => {
  let component: BenderIconComponent;
  let fixture: ComponentFixture<BenderIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenderIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenderIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

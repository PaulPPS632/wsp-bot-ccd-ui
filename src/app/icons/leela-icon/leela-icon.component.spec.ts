import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeelaIconComponent } from './leela-icon.component';

describe('LeelaIconComponent', () => {
  let component: LeelaIconComponent;
  let fixture: ComponentFixture<LeelaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeelaIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeelaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

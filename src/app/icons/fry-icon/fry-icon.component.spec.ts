import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FryIconComponent } from './fry-icon.component';

describe('FryIconComponent', () => {
  let component: FryIconComponent;
  let fixture: ComponentFixture<FryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FryIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

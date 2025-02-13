import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewflowComponent } from './newflow.component';

describe('NewflowComponent', () => {
  let component: NewflowComponent;
  let fixture: ComponentFixture<NewflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

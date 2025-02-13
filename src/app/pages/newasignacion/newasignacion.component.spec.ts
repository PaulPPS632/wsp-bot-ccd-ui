import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewasignacionComponent } from './newasignacion.component';

describe('NewasignacionComponent', () => {
  let component: NewasignacionComponent;
  let fixture: ComponentFixture<NewasignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewasignacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewasignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

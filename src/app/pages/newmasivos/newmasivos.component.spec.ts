import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmasivosComponent } from './newmasivos.component';

describe('NewmasivosComponent', () => {
  let component: NewmasivosComponent;
  let fixture: ComponentFixture<NewmasivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewmasivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewmasivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

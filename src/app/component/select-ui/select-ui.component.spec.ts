import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUiComponent } from './select-ui.component';

describe('SelectUiComponent', () => {
  let component: SelectUiComponent;
  let fixture: ComponentFixture<SelectUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

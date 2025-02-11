import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotsComponent } from './bots.component';

// 1️⃣ Importar FontAwesomeModule
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('BotsComponent', () => {
  let component: BotsComponent;
  let fixture: ComponentFixture<BotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotsComponent, FontAwesomeModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

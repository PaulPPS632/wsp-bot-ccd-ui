import { TestBed } from '@angular/core/testing';

import { MasivosService } from './masivos.service';

describe('MasivosService', () => {
  let service: MasivosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasivosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

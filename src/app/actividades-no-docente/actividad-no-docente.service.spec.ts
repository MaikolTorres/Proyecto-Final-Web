import { TestBed } from '@angular/core/testing';

import { ActividadNoDocenteService } from './actividad-no-docente.service';

describe('ActividadNoDocenteService', () => {
  let service: ActividadNoDocenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActividadNoDocenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

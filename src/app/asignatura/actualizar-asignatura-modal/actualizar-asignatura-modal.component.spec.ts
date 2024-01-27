import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAsignaturaModalComponent } from './actualizar-asignatura-modal.component';

describe('ActualizarAsignaturaModalComponent', () => {
  let component: ActualizarAsignaturaModalComponent;
  let fixture: ComponentFixture<ActualizarAsignaturaModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarAsignaturaModalComponent]
    });
    fixture = TestBed.createComponent(ActualizarAsignaturaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

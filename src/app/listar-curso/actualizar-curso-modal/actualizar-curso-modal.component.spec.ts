import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCursoModalComponent } from './actualizar-curso-modal.component';

describe('ActualizarCursoModalComponent', () => {
  let component: ActualizarCursoModalComponent;
  let fixture: ComponentFixture<ActualizarCursoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarCursoModalComponent]
    });
    fixture = TestBed.createComponent(ActualizarCursoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

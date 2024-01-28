import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaizarDocenteModalComponent } from './actuaizar-docente-modal.component';

describe('ActuaizarDocenteModalComponent', () => {
  let component: ActuaizarDocenteModalComponent;
  let fixture: ComponentFixture<ActuaizarDocenteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActuaizarDocenteModalComponent]
    });
    fixture = TestBed.createComponent(ActuaizarDocenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

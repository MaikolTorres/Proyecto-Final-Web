import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuaizarCursoComponent } from './actuaizar-curso.component';

describe('ActuaizarCursoComponent', () => {
  let component: ActuaizarCursoComponent;
  let fixture: ComponentFixture<ActuaizarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActuaizarCursoComponent]
    });
    fixture = TestBed.createComponent(ActuaizarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

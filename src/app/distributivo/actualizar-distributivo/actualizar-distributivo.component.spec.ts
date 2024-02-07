import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarDistributivoComponent } from './actualizar-distributivo.component';

describe('ActualizarDistributivoComponent', () => {
  let component: ActualizarDistributivoComponent;
  let fixture: ComponentFixture<ActualizarDistributivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarDistributivoComponent]
    });
    fixture = TestBed.createComponent(ActualizarDistributivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { ActividadesNoDocente } from '../actividades-no-docente/actividades-no-docente';
import { ActividadNoDocenteService } from '../actividades-no-docente/actividad-no-docente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarNoDocenteComponent } from '../actividades-no-docente/actualizar-no-docente/actualizar-no-docente.component';

@Component({
  selector: 'app-listar-actividades-no-docentes',
  templateUrl: './listar-actividades-no-docentes.component.html',
  styleUrls: ['./listar-actividades-no-docentes.component.css'],
})
export class ListarActividadesNoDocentesComponent {
  nodocente: ActividadesNoDocente[] = [];
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  modalRef: BsModalRef | undefined;
  actividad: ActividadesNoDocente | undefined;
  constructor(
    private actividadnodocente: ActividadNoDocenteService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }
  cargarLista(): void {
    this.actividadnodocente.get().subscribe(
      (nodocentes) => {
        this.nodocente = nodocentes;
        this.isLoading = false;
        console.error('Error al cargar las actividades:', nodocentes);
      },
      (error) => {
        console.error('Error al cargar las actividades:', error);
        this.isLoading = false;
      }
    );
  }
  abrirModalActualizar(actividad: ActividadesNoDocente) {
    const initialState = {
      actividad: actividad,
    };
    this.actividad = actividad;
    this.cargarLista;

    this.modalRef = this.modalService.show(ActualizarNoDocenteComponent, {
      initialState,
    });
  }
}

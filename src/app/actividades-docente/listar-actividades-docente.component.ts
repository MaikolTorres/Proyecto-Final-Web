import { Component } from '@angular/core';
import { ActividadesDocente } from './actividades-docente';
import { ActividadesDocenteService } from './actividades-docente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarDocenteModalComponent } from './actualizar-docente-modal/actualizar-docente-modal.component';

@Component({
  selector: 'app-listar-actividades-docente',
  templateUrl: './listar-actividades-docente.component.html',
  styleUrls: ['./listar-actividades-docente.component.css'],
})
export class ListarActividadesDocenteComponent {

  actividades: ActividadesDocente[] = [];
  modalRef: BsModalRef | undefined;
  act: ActividadesDocente | undefined;

  constructor(private actividadesService: ActividadesDocenteService,
    private modalService: BsModalService
    ) {}

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }

  cargarLista(): void {
    this.actividadesService.getActividades().subscribe((act) => (this.actividades = act));
  }

  abrirModalActualizar(activi: ActividadesDocente) {
    const initialState = {
      activi: activi,
    };

    this.act = activi;

    this.modalRef = this.modalService.show(ActualizarDocenteModalComponent, {
      initialState,
    });
  }

  eliminarActividad(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      this.actividadesService.deleteActividad(id).subscribe(
        data => {
          console.log('Actividad eliminada con éxito:', data);
        },
        error => {
          console.error('Error al eliminar actividad', error);
        }
      );
    }
  }
}

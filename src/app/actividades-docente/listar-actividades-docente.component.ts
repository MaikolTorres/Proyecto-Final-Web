import { Component } from '@angular/core';
import { ActividadesDocente } from './actividades-docente';
import { ActividadesDocenteService } from './actividades-docente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-actividades-docente',
  templateUrl: './listar-actividades-docente.component.html',
  styleUrls: ['./listar-actividades-docente.component.css'],
})
export class ListarActividadesDocenteComponent {

  actividades: ActividadesDocente[] = [];
  modalRef: BsModalRef | undefined;
  act: ActividadesDocente | undefined;

  constructor(private actividadesService: ActividadesDocenteService) {}

  ngOnInit(): void {
    this.cargarActividad();
    FormsModule;
  }

  cargarActividad() {
    this.actividadesService.getActividades().subscribe(
      (data: ActividadesDocente[]) => {
        this.actividades = data;
      },
      (error) => {
        console.error('Error al cargar periodos:', error);
      }
    );
  }

  cargarLista(): void {
    this.actividadesService.getActividades().subscribe((act) => (this.actividades = act));
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

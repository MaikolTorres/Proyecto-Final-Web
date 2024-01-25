import { Component } from '@angular/core';
import { ExtraActividadesService } from './extra-actividades.service';
import { ExtraActividades } from './extra-actividades';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarExtraModalComponent } from './actualizar-extra-modal/actualizar-extra-modal.component';


@Component({
  selector: 'app-listar-extra-actividades',
  templateUrl: './listar-extra-actividades.component.html',
  styleUrls: ['./listar-extra-actividades.component.css']
})

export class ListarExtraActividadesComponent {

  actividades: ExtraActividades[] = [];
  modalRef: BsModalRef | undefined;
  extra: ExtraActividades | undefined;

  constructor(private extraActividadesService: ExtraActividadesService,
     private modalService: BsModalService)
     { }

  ngOnInit(): void {
    this.cargarActividades();
    FormsModule;
  }

  cargarActividades() {
    this.extraActividadesService.getAll().subscribe(
      (data: ExtraActividades[]) => {
        this.actividades = data;
      },
      (error) => {
        console.error('Error al cargar actividades:', error);
      }
    );
  }

  cargarLista(): void {
    this.extraActividadesService.getAll().subscribe((extra) => (this.actividades = extra));
  }

  abrirModalActualizar(extra: ExtraActividades) {
    const initialState = {
      extra: extra, 
    };

    this.extra = extra;

    this.modalRef = this.modalService.show(ActualizarExtraModalComponent, {
      initialState,
    });
  }

  eliminarActividad(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta actividad extra?')) {
      this.extraActividadesService.delete(id).subscribe(
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

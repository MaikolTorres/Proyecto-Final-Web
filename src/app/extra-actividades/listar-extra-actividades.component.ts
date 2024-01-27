import { Component, OnInit } from '@angular/core';
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

export class ListarExtraActividadesComponent implements OnInit {
  [x: string]: any;

  extras: ExtraActividades[] = [];
  urlEndPoint_3: any;
  http: any;

  modalRef: BsModalRef | undefined;
  extra: ExtraActividades | undefined;
  nombreABuscar: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  rolesFiltradas: ExtraActividades[] = [];  // Nuevo array para las jornadas filtradas
  todasLosroles: ExtraActividades[] = [];

  constructor(private extraService: ExtraActividadesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }

  cargarLista(): void {
    this.extraService.getExtras().subscribe(
      extras => {
        this.extras = extras;
        this.isLoading = false; // Marcar la carga como completa después de recibir los roles
      },
      error => {
        console.error('Error al cargar las actividades extras:', error);
        this.isLoading = false; // Marcar la carga como completa en caso de error
      }
    );
  }

  cargarExtra(extra_id: number): void {
    this.extraService.getextrasid(extra_id).subscribe(
      data => {
        this.extra = data;
        console.log(data); // Muestra la respuesta en la consola
        this.eliminarExtra(this.extra.extra_id);  // Llamada a la función para abrir el modal
      },
      error => {
        console.error(error);
      }
    );
  }

  abrirModalActualizar(extra: ExtraActividades) {
    const initialState = {
      extra: extra,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };

    // Asignar la jornada al contexto del componente
    this.extra = extra;
    this.cargarLista;

    this.modalRef = this.modalService.show(ActualizarExtraModalComponent, { initialState });
  }

  eliminarExtra(extra_id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      // Llama al servicio para eliminar el rol
      this.extraService.deleteExtras(extra_id).subscribe(
        data => {
          console.log('Actividad extra eliminado con éxito:', data);
          // Aquí puedes realizar acciones adicionales después de la eliminación
        },
        error => {
          console.error('Error al eliminar la actividad extra:', error);
          // Manejar el error según sea necesario
        }

      );
    }
  }
  textoBusqueda: string = '';

  // buscar

  rolMatchesSearch(extra: ExtraActividades): boolean {
    return extra.extra_nombre_proyecto_investigacion.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '') {
      this.extras = this.extras.filter((extra: ExtraActividades) => this.rolMatchesSearch(extra));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}

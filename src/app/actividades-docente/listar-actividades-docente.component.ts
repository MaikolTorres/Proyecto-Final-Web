import { Component, OnInit } from '@angular/core';
import { ActividadesDocente } from './actividades-docente';
import { ActividadesDocenteService } from './actividades-docente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarDocenteModalComponent } from './actualizar-docente-modal/actualizar-docente-modal.component';
import { AsignaturaComponent } from '../asignatura/asignatura.component';
import { ExtraActividadesComponent } from '../extra-actividades/extra-actividades.component';
import { ExtraActividadesService } from '../extra-actividades/extra-actividades.service';
import { ActividadesDocenteComponent } from './actividades-docente.component';

@Component({
  selector: 'app-listar-actividades-docente',
  templateUrl: './listar-actividades-docente.component.html',
  styleUrls: ['./listar-actividades-docente.component.css'], // Esta línea indica la ruta del archivo CSS
})
export class ListarActividadesDocenteComponent implements OnInit{
  asignatura: AsignaturaComponent | undefined; 
  extra:ExtraActividadesComponent | undefined

  [x: string]: any;
  actividades:ActividadesDocente[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  usuFiltradas: ActividadesDocente[] = [];  // Nuevo array para las jornadas filtradas
  todasLasusu: ActividadesDocente[] = [];
  
  modalRef: BsModalRef | undefined;
    actividad: ActividadesDocente | undefined;
    constructor(private actividadService: ActividadesDocenteService, private modalService: BsModalService) {}
  


    ngOnInit(): void {
      this.cargarLista();
      FormsModule;  }
  
  
      cargarLista(): void {
        this.actividadService.getAct().subscribe(
          actividades => {
            this.actividades = actividades;
            this.isLoading = false;
            console.error('Error al cargar las actividades:', actividades);
            // Marcar la carga como completa después de recibir los roles
          },
          error => {
            console.error('Error al cargar las actividades:', error);
            this.isLoading = false; // Marcar la carga como completa en caso de error
          }
        );
      }
      cargarActividad(actividad_id: number): void {
        this.actividadService.getactividadId(actividad_id).subscribe(
          data => {
            this.actividad = data;
            console.log(data); // Muestra la respuesta en la consola
            this.eliminarActividades(this.actividad.actividoc_id);  // Llamada a la función para abrir el modal
          },
          error => {
            console.error(error);
          }
        );
      }

      arirModalActualizar(actividad: ActividadesDocente) {
        const initialState = {
          actividad: actividad,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
        };
            this.actividad= actividad;
        this.cargarLista;
    
        this.modalRef = this.modalService.show(ActualizarDocenteModalComponent, { initialState });
      }

      eliminarActividades(act_id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
          // Llama al servicio para eliminar el rol
          this.actividadService.deleteA(act_id).subscribe(
            data => {
              console.log('Asignatura eliminado con éxito:', data);
              // Aquí puedes realizar acciones adicionales después de la eliminación
            },
            error => {
              console.error('Error al eliminar :', error);
              // Manejar el error según sea necesario
            }
            
          );
        }
      }
      textoBusqueda: string = '';
      usuMatchesSearch(asignatura: ActividadesDocente): boolean {
        return asignatura.actividoc_nombre_actividad.toLowerCase().includes(this.textoBusqueda.toLowerCase());
      }
    
      buscar(): void {
        if (this.textoBusqueda.trim() !== '' ) {
          this.actividades = this.actividades.filter((asignatura: ActividadesDocente) => this.usuMatchesSearch(asignatura));
        } else {
          this.cargarLista(); // Vuelve a cargar todas las jornadas
        }
      }
  }
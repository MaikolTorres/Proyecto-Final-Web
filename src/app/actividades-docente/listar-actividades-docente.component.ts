import { Component, OnInit } from '@angular/core';
import { ActividadesDocente } from './actividades-docente';
import { ActividadesDocenteService } from './actividades-docente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarDocenteModalComponent } from './actualizar-docente-modal/actualizar-docente-modal.component';
import { AsignaturaComponent } from '../asignatura/asignatura.component';
import { ExtraActividadesComponent } from '../extra-actividades/extra-actividades.component';

@Component({
  selector: 'app-listar-actividades-docente',
  templateUrl: './listar-actividades-docente.component.html',
  styleUrls: ['./listar-actividades-docente.component.css'], 
})
export class ListarActividadesDocenteComponent implements OnInit{

  asignatura: AsignaturaComponent | undefined; 
  extra:ExtraActividadesComponent | undefined

  [x: string]: any;
  actividades:ActividadesDocente[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true;
  usuFiltradas: ActividadesDocente[] = [];  
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
          },
          error => {
            console.error('Error al cargar las actividades:', error);
            this.isLoading = false; 
          }
        );
      }
      cargarActividad(actividad_id: number): void {
        this.actividadService.getactividadId(actividad_id).subscribe(
          data => {
            this.actividad = data;
            console.log(data); 
            this.eliminarActividades(this.actividad.actividoc_id); 
          },
          error => {
            console.error(error);
          }
        );
      }

      abrirModalActualizar(actividad: ActividadesDocente) {
        const initialState = {
          actDocente: actividad,  
        };
            this.actividad= actividad;
        this.cargarLista;
    
        this.modalRef = this.modalService.show(ActualizarDocenteModalComponent, { initialState });
      }

      eliminarActividades(act_id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
          this.actividadService.deleteA(act_id).subscribe(
            data => {
              console.log('Asignatura eliminado con éxito:', data);
            },
            error => {
              console.error('Error al eliminar :', error);
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
          this.cargarLista(); 
        }
      }
  }
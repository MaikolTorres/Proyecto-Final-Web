import { Component, OnInit } from '@angular/core';
import { DocenteComponent } from '../docente/docente.component';
import { ListarCursoComponent } from '../listar-curso/listar-curso.component';
import { Asignatura } from './asignatura';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AsignaturaService } from './asignatura.service';
import { FormsModule } from '@angular/forms';
import { ActualizarAsignaturaModalComponent } from './actualizar-asignatura-modal/actualizar-asignatura-modal.component';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit{
  docente: DocenteComponent | undefined; 
  curso:ListarCursoComponent | undefined

  [x: string]: any;
  asignaturas:Asignatura[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  usuFiltradas: Asignatura[] = [];  // Nuevo array para las jornadas filtradas
  todasLasusu: Asignatura[] = [];
  
  modalRef: BsModalRef | undefined;
    asignatura: Asignatura | undefined;
    constructor(private AsignaturaService: AsignaturaService, private modalService: BsModalService) {}
  


    ngOnInit(): void {
      this.cargarLista();
      FormsModule;  }
  
  
      cargarLista(): void {
        this.AsignaturaService.get().subscribe(
          asignaturas => {
            this.asignaturas = asignaturas;
            this.isLoading = false;
            console.error('Error al cargar las asignaturas:', asignaturas);
            // Marcar la carga como completa después de recibir los roles
          },
          error => {
            console.error('Error al cargar las asignaturas:', error);
            this.isLoading = false; // Marcar la carga como completa en caso de error
          }
        );
      }
      cargarUsuario(asigg_id: number): void {
        this.AsignaturaService.getasignaturaId(asigg_id).subscribe(
          data => {
            this.asignatura = data;
            console.log(data); // Muestra la respuesta en la consola
            this.eliminarasignatura(this.asignatura.asignatura_id);  // Llamada a la función para abrir el modal
          },
          error => {
            console.error(error);
          }
        );
      }
      arirModalActualizar(asignatura: Asignatura) {
        const initialState = {
          asignatura: asignatura,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
        };
            this.asignatura= asignatura;
        this.cargarLista;
    
       this.modalRef = this.modalService.show(ActualizarAsignaturaModalComponent, { initialState });
      }
      eliminarasignatura(asiganatura_id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
          // Llama al servicio para eliminar el rol
          this.AsignaturaService.deleteA(asiganatura_id).subscribe(
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
      usuMatchesSearch(asignatura: Asignatura): boolean {
        return asignatura.asignatura_nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
      }
    
      buscar(): void {
        if (this.textoBusqueda.trim() !== '' ) {
          this.asignaturas = this.asignaturas.filter((asignatura: Asignatura) => this.usuMatchesSearch(asignatura));
        } else {
          this.cargarLista(); // Vuelve a cargar todas las jornadas
        }
      }
  }
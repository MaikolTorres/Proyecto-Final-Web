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
  isLoading: boolean = true; 
  usuFiltradas: Asignatura[] = [];  
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

          },
          error => {
            console.error('Error al cargar las asignaturas:', error);
            this.isLoading = false; 
          }
        );
      }
      cargarUsuario(asigg_id: number): void {
        this.AsignaturaService.getasignaturaId(asigg_id).subscribe(
          data => {
            this.asignatura = data;
            console.log(data); 
            this.eliminarasignatura(this.asignatura.asignatura_id);  
          },
          error => {
            console.error(error);
          }
        );
      }
      arirModalActualizar(asignatura: Asignatura) {
        const initialState = {
          asignatura: asignatura,  
        };
            this.asignatura= asignatura;
        this.cargarLista;
    
       this.modalRef = this.modalService.show(ActualizarAsignaturaModalComponent, { initialState });
      }
      eliminarasignatura(asiganatura_id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
          this.AsignaturaService.deleteA(asiganatura_id).subscribe(
            data => {
              console.log('Asignatura eliminado con éxito:', data);
              location.reload();

            },
            error => {
              console.error('Error al eliminar :', error);
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
          this.cargarLista(); 
        }
      }
  }
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CursoService } from './curso.service';
import { FormsModule } from '@angular/forms';
import { ActualizarCursoModalComponent } from './actualizar-curso-modal/actualizar-curso-modal.component';
import { JornadaComponent } from '../jornada/jornada.component';
import { ListarCarreraComponent } from '../carrera/listar-carrera.component';
import { ListarPeriodoComponent } from '../periodos/listar-periodo.component';
import { PeriodosComponent } from '../periodos/periodos.component';
import { CarreraComponent } from '../carrera/carrera.component';


@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit{
  periodo: PeriodosComponent | undefined; 
  carrera:CarreraComponent | undefined
  jornada:JornadaComponent | undefined



  [x: string]: any;
  cursos:Curso[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true;
  usuFiltradas: Curso[] = []; 
  todasLasusu: Curso[] = [];
  
  modalRef: BsModalRef | undefined;
    curso: Curso | undefined;
    constructor(private CursoService: CursoService, private modalService: BsModalService) {}
  


    ngOnInit(): void {
      this.cargarLista();
      this.cargarCurso;
      FormsModule;  }
  
  
      cargarLista(): void {
        this.CursoService.get().subscribe(
          cursos => {
            this.cursos = cursos;
            this.isLoading = false;
            console.error('Error al cargar los cursos:', cursos);

          },
          error => {
            console.error('Error al cargar los cursos:', error);
            this.isLoading = false; 
          }
        );
      }
      cargarCurso(id: number): void {
        this.CursoService.getcursoId(id).subscribe(
          data => {
            this.curso = data;
            console.log(data); 
            this.eliminarcurso(this.curso.curso_id);  
          },
          error => {
            console.error(error);
          }
        );
      }
      arirModalActualizar(curso: Curso) {
        const initialState = {
          curso: curso, 
        };
            this.curso= curso;
        this.cargarLista;
    
       this.modalRef = this.modalService.show(ActualizarCursoModalComponent, { initialState });
      }
      eliminarcurso(id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
          this.CursoService.deleteCurso(id).subscribe(
            data => {
              console.log('Curso eliminado con éxito:', data);
            },
            error => {
              console.error('Error al eliminar :', error);
            }
            
          );
        }
      }
      textoBusqueda: string = '';
      usuMatchesSearch(curso: Curso): boolean {
        return curso.curso_nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
      }
    
      buscar(): void {
        if (this.textoBusqueda.trim() !== '' ) {
          this.cursos = this.cursos.filter((curso: Curso) => this.usuMatchesSearch(curso));
        } else {
          this.cargarLista();
        }
      }
  }
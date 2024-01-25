import { Component, OnInit } from '@angular/core';
import { ListarCarreraComponent } from '../carrera/listar-carrera.component';
import { JornadaComponent } from '../jornada/jornada.component';
import { Carrera } from '../carrera/carrera';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CursoService } from './curso.service';
import { Curso } from './curso';
import { FormsModule } from '@angular/forms';
import { ActuaizarCursoComponent } from './actuaizar-curso/actuaizar-curso.component';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {
 
 carrera:ListarCarreraComponent | undefined;
 jornada:JornadaComponent |undefined;
 
 

  [x: string]: any;
  cursos:Curso[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  cursoFiltradas: Curso[] = [];  // Nuevo array para las jornadas filtradas
  todasLoscursos: Curso[] = [];
  modalRef: BsModalRef | undefined;
  curso: Curso | undefined;
  constructor(private cursoService: CursoService, private modalService: BsModalService) {}
  ngOnInit(): void {
    this.cargarLista();
    FormsModule;  }


    cargarLista(): void {
      this.cursoService.getCurso().subscribe(
        cursos => {
          this.cursos = cursos;
          this.isLoading = false;
          console.error('Error al cargar las cursos:', cursos);
          // Marcar la carga como completa después de recibir los roles
        },
        error => {
          console.error('Error al cargar las cursos:', error);
          this.isLoading = false; // Marcar la carga como completa en caso de error
        }
      );
    }
    cargarCurso(curso_id: number): void {
      this.cursoService.getCursoid(curso_id).subscribe(
        data => {
          this.curso = data;
          console.log(data); // Muestra la respuesta en la consola
          this.eliminarcurso(this.curso.curso_id);  // Llamada a la función para abrir el modal
        },
        error => {
          console.error(error);
        }
      );
    }
    arirModalActualizar(curso: Curso) {
      const initialState = {
        curso: Curso,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
      };
  
      // Asignar la jornada al contexto del componente
      this.curso= curso;
      this.cargarLista;
  
      this.modalRef = this.modalService.show(ActuaizarCursoComponent, { initialState });
    }
    eliminarcurso(curso_id: number): void {
      if (confirm('¿Estás seguro de que deseas eliminar esta curso?')) {
        // Llama al servicio para eliminar el rol
        this.cursoService.deleteCurso(curso_id).subscribe(
          data => {
            console.log('usuario eliminado con éxito:', data);
            // Aquí puedes realizar acciones adicionales después de la eliminación
          },
          error => {
            console.error('Error al eliminar el persona:', error);
            // Manejar el error según sea necesario
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
        this.cargarLista(); // Vuelve a cargar todas las jornadas
      }
    }
}

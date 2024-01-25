import { Component } from '@angular/core';
import { Curso } from './curso';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CursoService } from './curso.service';
import { FormsModule } from '@angular/forms';
import { ActualizarCursoModalComponent } from './actualizar-curso-modal/actualizar-curso-modal.component';


@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent {
  [x: string]: any;


  cursos: Curso[] = [];
  
  urlEndPoint_3: any;
  http: any;
  modalRef: BsModalRef | undefined ;
  curso: Curso | undefined;
  nombreABuscar: any;
  //
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  Filtradas: Curso[] = [];  // Nuevo array para las jornadas filtradas
  todasLasCursos: Curso[] = []; 

  constructor(private curservice: CursoService, private modalService: BsModalService ) {}

  ngOnInit(): void {
    this.cargarLista();
    FormsModule
  }


  
  cargarLista(): void {
    this.curservice.get().subscribe(
      cursos => this.cursos = cursos
    );
  }

  cargarCurso(cursoId: number): void {
    this.curservice.getcursoId(cursoId).subscribe(
      data => {
        this.curso = data;
        console.log(data); // Muestra la respuesta en la consola
        this.eliminarCurso(this.curso.curso_id);  // Llamada a la función para abrir el modal
      },
      error => {
        console.error(error);
      }
    );
  }
  
  //prueba
  abrirModalActualizar(curso: Curso) {
    const initialState = {
      curso: curso,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };
  
    // Asignar la jornada al contexto del componente
    this.curso = curso;
  
    this.modalRef = this.modalService.show(ActualizarCursoModalComponent, { initialState });
  }
  //
  eliminarCurso(cursoId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar ?')) {
      // Llama al servicio para eliminar la jornada
      this.curservice.deleteCurso(cursoId).subscribe(
        data => {
          console.log('Curso eliminada con éxito:', data);
          // Aquí puedes realizar acciones adicionales después de la eliminación
        },
        error => {
          console.error('Error al eliminar :', error);
          // Manejar el error según sea necesario
        }
      );
    }
  }
  ///
  textoBusqueda: string = '';

  // buscar
  
  cursoMatchesSearch(jornada: Curso): boolean {
    return jornada.curso_nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '' ) {
      //this.cursos = this.cursos.filter((jornada: Curso) => this.cursosMatchesSearch(jornada));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }


}

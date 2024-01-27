import { Component, OnInit } from '@angular/core';
import { JornadaService } from './jornada.service';
import { Jornada } from './jornada';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActualizarJornadaModalComponent } from './actualizar-jornada-modal/actualizar-jornada-modal.component';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listar-jornada',
  templateUrl: './listar-jornada.component.html',
  styleUrls: ['./listar-jornada.component.css']
})
export class ListarJornadaComponent  implements OnInit {
  [x: string]: any;


  jornadas: Jornada[] = [];
  
  urlEndPoint_3: any;
  http: any;
  modalRef: BsModalRef | undefined ;
  jornada: Jornada | undefined;
  nombreABuscar: any;
  //
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  jornadasFiltradas: Jornada[] = [];  // Nuevo array para las jornadas filtradas
  todasLasJornadas: Jornada[] = []; 

  constructor(private jornadaService: JornadaService, private modalService: BsModalService ) {}

  ngOnInit(): void {
    this.cargarLista();
    FormsModule
  }


  
  cargarLista(): void {
    this.jornadaService.getJornadas().subscribe(
      jornadas => this.jornadas = jornadas
    );
  }

  cargarJornada(jornadaId: number): void {
    this.jornadaService.getjornadaid(jornadaId).subscribe(
      data => {
        this.jornada = data;
        console.log(data); // Muestra la respuesta en la consola
        this.eliminarJornada(this.jornada.jornada_id);  // Llamada a la función para abrir el modal
      },
      error => {
        console.error(error);
      }
    );
  }
  
  //prueba
  abrirModalActualizar(jornada: Jornada) {
    const initialState = {
      jornada: jornada,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };
  
    // Asignar la jornada al contexto del componente
    this.jornada = jornada;
  
    this.modalRef = this.modalService.show(ActualizarJornadaModalComponent, { initialState });
  }
  //
  eliminarJornada(jornadaId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta jornada?')) {
      // Llama al servicio para eliminar la jornada
      this.jornadaService.deleteJornada(jornadaId).subscribe(
        data => {
          console.log('Jornada eliminada con éxito:', data);
          window.location.reload();
          // Aquí puedes realizar acciones adicionales después de la eliminación
        },
        error => {
          console.error('Error al eliminar la jornada:', error);
          window.location.reload();

          // Manejar el error según sea necesario
        }
      );
    }
  }
  ///
  textoBusqueda: string = '';

  // buscar
  
  jornadaMatchesSearch(jornada: Jornada): boolean {
    return jornada.jornada_nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '' ) {
      this.jornadas = this.jornadas.filter((jornada: Jornada) => this.jornadaMatchesSearch(jornada));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}



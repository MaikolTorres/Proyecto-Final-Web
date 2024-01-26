import { Component, OnInit } from '@angular/core';
import { CarreraService } from './carrera.service';
import { Carrera } from './carrera';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarCarreraModalComponent } from './actualizar-carrera-modal/actualizar-carrera-modal.component';

@Component({
  selector: 'app-listar-carrera',
  templateUrl: './listar-carrera.component.html',
  styleUrls: ['./listar-carrera.component.css']
})
export class ListarCarreraComponent implements OnInit {

  carrera: Carrera[] = [];
  modalRef: BsModalRef | undefined;
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  perFiltradas: Carrera[] = [];  // Nuevo array para las jornadas filtradas
  todasLasper: Carrera[] = [];
  persona: Carrera | undefined;
  Carrera: Carrera | undefined;


  constructor(private carreraService: CarreraService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }
  cargarLista(): void {
    this.carreraService.getCarrera().subscribe(
      carrera => {
        this.carrera = carrera;
        this.isLoading = false; // Marcar la carga como completa después de recibir los roles
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false; // Marcar la carga como completa en caso de error
      }
    );
  }

  cargarCarrera(carrera_id: number) : void{
    this.carreraService.getCarreraId(carrera_id).subscribe(
      data => {
        this.Carrera = data;
        console.log(data); // Muestra la respuesta en la consola
        this.eliminarCarrera(this.Carrera.carrera_id);  // Llamada a la función para abrir el modal
      },
      error => {
        console.error(error);
      }
    );
  }
  abrirModalActualizar(carrera: Carrera) {
    const initialState = {
      carrera: carrera,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };

    // Asignar la jornada al contexto del componente
    this.Carrera = carrera;
    this.cargarLista;

    this.modalRef = this.modalService.show(ActualizarCarreraModalComponent, { initialState });
  }


  eliminarCarrera(id: number): void {

    if (confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
      this.carreraService.delete(id).subscribe(
        data => {
          console.log('Carrera eliminada con éxito:', data);
        },
        error => {
          console.error('Error al eliminar carrera', error);
        }
      );
    }
  }
  textoBusqueda: string = '';

  // buscar
  
  perMatchesSearch(carrera: Carrera): boolean {
    return carrera.carrera_nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '' ) {
      this.carrera = this.carrera.filter((carrera: Carrera) => this.perMatchesSearch(carrera));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Titulo } from './titulo';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TituloService } from './titulo.service';
import { FormsModule } from '@angular/forms';
import { ActualizarTituloComponent } from './actualizar-titulo/actualizar-titulo.component';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit{
  [x: string]: any;

  titulos: Titulo[] = [];
  urlEndPoint_3: any;
  http: any;

  modalRef: BsModalRef | undefined;
  titulo: Titulo | undefined;
  nombreABuscar: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  tituFiltradas: Titulo[] = [];  // Nuevo array para las jornadas filtradas
  todasLostitu: Titulo[] = [];
  
  constructor(private tituloService: TituloService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }
  cargarLista(): void {
    this.tituloService.getTitulos().subscribe(
      titulos => {
        this.titulos = titulos;
        this.isLoading = false; // Marcar la carga como completa después de recibir los roles
      },
      error => {
        console.error('Error al cargar los titulos:', error);
        this.isLoading = false; // Marcar la carga como completa en caso de error
      }
    );
  }

  cargarTitu(titulo_id: number): void {
    this.tituloService.gettilulosid(titulo_id).subscribe(
      data => {
        this.titulo = data;
        console.log(data); // Muestra la respuesta en la consola
        this.eliminartitulo(this.titulo.titulo_id);  // Llamada a la función para abrir el modal
      },
      error => {
        console.error(error);
      }
    );
  }

  abrirModalActualizar(titulo: Titulo) {
    const initialState = {
      titulo: titulo,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };

    // Asignar la jornada al contexto del componente
    this.titulo = titulo;
    this.cargarLista;

    this.modalRef = this.modalService.show(ActualizarTituloComponent, { initialState });
  }
  eliminartitulo(titulo_id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este titulo?')) {
      // Llama al servicio para eliminar el rol
      this.tituloService.deletetitulo(titulo_id).subscribe(

        data => {
          console.log('titulo eliminado con éxito:', data);
          window.location.reload();

          // Aquí puedes realizar acciones adicionales después de la eliminación
        },
        error => {
          console.error('Error al eliminar el titulo:', error);
          window.location.reload();

          // Manejar el error según sea necesario
        }
        
      );
    }
  }
  textoBusqueda: string = '';

  // buscar
  
  rolMatchesSearch(titulo: Titulo): boolean {
    return titulo.titulo_nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '' ) {
      this.titulos = this.titulos.filter((titulo: Titulo) => this.rolMatchesSearch(titulo));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}

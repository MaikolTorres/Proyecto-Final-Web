import { Component,OnInit } from '@angular/core';
import { GradoOcupacional } from '../grado-ocupacional';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GradoOcupacionalService } from '../grado-ocupacional.service';
import { ActualizarGradoModalComponent } from '../actualizar-grado-modal/actualizar-grado-modal.component';
import { AlertService } from 'src/app/service/Alert.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-grado',
  templateUrl: './listar-grado.component.html',
  styleUrls: ['./listar-grado.component.css']
})
export class ListarGradoComponent implements OnInit {


  grados: GradoOcupacional[] = [];
  
  urlEndPoint_3: any;
  http: any;
  modalRef: BsModalRef | undefined ;
  grado: GradoOcupacional | undefined;
  cargo: any;

  constructor(private Service: GradoOcupacionalService, private modalService: BsModalService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }


  
  cargarLista(): void {
    this.Service.getGrados().subscribe(
      grados => this.grados = grados
    );
  }

  cargarJornada(gradoId: number): void {
    this.Service.getgradoid(gradoId).subscribe(
      data => {
        this.grado = data;
        console.log(data); // Muestra la respuesta en la consola
        this.abrirModalActualizar(this.grado);  // Llamada a la función para abrir el modal
      },
      error => {
        console.error(error);
      }
    );
  }
  
  //prueba
  abrirModalActualizar(grado: GradoOcupacional) {
    const initialState = {
      grado: grado,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };
  
    // Asignar la jornada al contexto del componente
    this.grado = grado;
  
    this.modalRef = this.modalService.show(ActualizarGradoModalComponent, { initialState });
  }

  eliminar(gradoId: number): void {
    this.alertService
      .question(
        '¿Está seguro que desea eliminar?',
        '',
        true,
        true,
        'Sí, eliminar',
        'Cancelar',
        'assets/icons/exclamation.png'
      )
      .then((result) => {
        if (result) {
          // Llama al servicio para eliminar el grado ocupacional
          this.Service.deleteGrado(gradoId).subscribe(
            () => {
              this.alertService.notification(
                `Grado Ocupacional Eliminado: ${this.grado?.grado_titulo}`,
                'success'
              );
              this.cargarLista(); // Actualizar la lista después de eliminar
            },
            (error) => {
              console.error('Error al eliminar grado ocupacional:', error);
            }
          );
        }
      });

    }
    textoBusqueda: string = '';

  // buscar
  
  perMatchesSearch(grado: GradoOcupacional): boolean {
    return grado.grado_titulo.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '' ) {
      this.grados = this.grados.filter((grado: GradoOcupacional) => this.perMatchesSearch(grado));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { PersonaComponent } from '../persona/persona.component';
import { TipoContratoComponent } from '../tipo-contrato/tipo-contrato.component';
import { CargoComponent } from '../cargo/cargo.component';
import { TituloComponent } from '../titulo/titulo.component';
import { ListarPeriodoComponent } from '../periodos/listar-periodo.component';
import { DocenteService } from './docente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Docente } from './docente';
import { GradoOcupacional } from '../grado-ocupacional/grado-ocupacional';
import { ActuaizarDocenteModalComponent } from './actuaizar-docente-modal/actuaizar-docente-modal.component';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {
  persona: PersonaComponent | undefined;
  tipo_con: TipoContratoComponent | undefined
  cargo: CargoComponent | undefined;
  titulo: TituloComponent | undefined;
  periodo: ListarPeriodoComponent | undefined;
  grado: GradoOcupacional | undefined;
  [x: string]: any;
  docentes: Docente[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  docentesFiltradas: Docente[] = [];  // Nuevo array para las jornadas filtradas
  todasLadocentes: Docente[] = [];

  modalRef: BsModalRef | undefined;
  docente: Docente | undefined;
  constructor(private docente_service: DocenteService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.cargarLista();
    this.cargarDocente;
    FormsModule;
  }

  cargarLista(): void {
    this.docente_service.getDocentes().subscribe(
      docentes => {
        this.docentes = docentes;
        this.isLoading = false;
        console.log('Docentes cargados correctamente:', docentes);
        // Marcar la carga como completa después de recibir los docentes
      },
      error => {
        console.error('Error al cargar los docentes:', error);
        this.isLoading = false; // Marcar la carga como completa en caso de error
      }
    );
  }

  cargarDocente(docente_id: number): void {
    this.docente_service.getDocenteById(docente_id).subscribe(
      data => {
        this.docente = data;
        console.log(data); 
      },
      error => {
        console.error(error);
      }
    );
  }

  arirModalActualizar(docente: Docente) {
    const initialState = {
      docente: docente,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };

    // Asignar la jornada al contexto del componente
    this.docente = docente;
    this.cargarLista;

    this.modalRef = this.modalService.show(ActuaizarDocenteModalComponent, { initialState });
  }

  eliminardoce(docente_id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta docente?')) {
      // Llama al servicio para eliminar el rol
      this.docente_service.deleteDocente(docente_id).subscribe(
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
  usuMatchesSearch(docente: Docente): boolean {
    return (
      (docente?.persona?.per_primer_nombre?.toLowerCase() + ' ' +
       docente?.persona?.per_apellido_paterno?.toLowerCase())
         .includes(this.textoBusqueda.toLowerCase())
    );
      }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '') {
      this.docentes = this.docentes.filter((docente: Docente) => this.usuMatchesSearch(docente));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }

}

import { Component } from '@angular/core';
import { TipoContrato } from './tipo-contrato';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TipoContratoService } from './tipo-contrato.service';
import { FormsModule } from '@angular/forms';
import { ActualizarTipocontratoModalComponent } from './actualizar-tipocontrato-modal/actualizar-tipocontrato-modal.component';

@Component({
  selector: 'app-tipo-contrato',
  templateUrl: './tipo-contrato.component.html',
  styleUrls: ['./tipo-contrato.component.css'],
})
export class TipoContratoComponent {
  tipocontrato: TipoContrato[] = [];

  modalRef: BsModalRef | undefined;
  tipocontratos: TipoContrato | undefined;

  constructor(
    private tipocontratoService: TipoContratoService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }

  cargarLista(): void {
    this.tipocontratoService
      .getTipoContrato()
      .subscribe((tipocontrato) => (this.tipocontrato = tipocontrato));
  }

  abrirModalActualizar(tipocontrato: TipoContrato) {
    const initialState = {
      tipocontrato: tipocontrato, // Cambié 'tipocontrato_id' a 'cargo' para pasar el objeto completo
    };

    // Asignar la jornada al contexto del componente
    this.tipocontratos = tipocontrato;

    this.modalRef = this.modalService.show(
      ActualizarTipocontratoModalComponent,
      {
        initialState,
      }
    );
  }
  //
  eliminarCargo(tipocontratoId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar el Tipo Contrato?')) {
      // Llama al servicio para eliminar la tipo
      this.tipocontratoService.deleteTipoContrato(tipocontratoId).subscribe(
        (data) => {
          console.log('Tipo Contrato eliminado con éxito:', data);
          // Aquí puedes realizar acciones adicionales después de la eliminación
        },
        (error) => {
          console.error('Error al eliminar el Tipo Contrato:', error);
          // Manejar el error según sea necesario
        }
      );
    }
  }
  textoBusqueda: string = '';

  // buscar

  perMatchesSearch(tipocontrato: TipoContrato): boolean {
    return tipocontrato.tipo_contrato.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '') {
      this.tipocontrato = this.tipocontrato.filter((tipocontrato: TipoContrato) => this.perMatchesSearch(tipocontrato));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}
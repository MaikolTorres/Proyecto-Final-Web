import { Component } from '@angular/core';
import { PeriodoService } from './periodo.service';
import { Periodos } from './periodo';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarPeriodoModalComponent } from './actualizar-periodo-modal/actualizar-periodo-modal.component';


@Component({
  selector: 'app-listar-periodo',
  templateUrl: './listar-periodo.component.html',
  styleUrls: ['./listar-periodo.component.css']
})
export class ListarPeriodoComponent {

  periodo: Periodos[] = [];
  modalRef: BsModalRef | undefined;
  per: Periodos | undefined;

  constructor(private periodoService: PeriodoService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }

  cargarLista(): void {
    this.periodoService.getPeriodo().subscribe((per) => (this.periodo = per));
  }

  abrirModalActualizar(periodo: Periodos) {
    const initialState = {
      periodo: periodo, 
    };

    this.per = periodo;
    this.cargarLista;
    this.modalRef = this.modalService.show(ActualizarPeriodoModalComponent, {
      initialState,
    });
  }

  eliminarPeriodo(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este periodo?')) {
      this.periodoService.delete(id).subscribe(
        data => {
          console.log('Periodo eliminada con éxito:', data);
        },
        error => {
          console.error('Error al eliminar periodo', error);
        }
      );
    }
  }
  textoBusqueda: string = '';

  // buscar

  perMatchesSearch(periodo: Periodos): boolean {
    // Convertir el año de inicio a una cadena de texto y luego aplicar toLowerCase()
    const periodoAnioInicioString: string = periodo.periodo_anio_inicio.toString();
    return periodoAnioInicioString.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }
  buscar(): void {
    if (this.textoBusqueda.trim() !== '') {
      this.periodo = this.periodo.filter((periodo: Periodos) => this.perMatchesSearch(periodo));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}

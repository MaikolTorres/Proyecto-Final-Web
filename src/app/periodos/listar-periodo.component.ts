import { Component } from '@angular/core';
import { PeriodoService } from './periodo.service';
import { Periodos } from './periodo';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listar-periodo',
  templateUrl: './listar-periodo.component.html',
  styleUrls: ['./listar-periodo.component.css']
})
export class ListarPeriodoComponent {

  periodo: Periodos[] = [];
  modalRef: BsModalRef | undefined;
  per: Periodos | undefined;

  constructor(private periodoService: PeriodoService) { }

  ngOnInit(): void {
    this.cargarPeriodo();
    FormsModule;
  }

  cargarPeriodo() {
    this.periodoService.getPeriodo().subscribe(
      (data: Periodos[]) => {
        this.periodo = data;
      },
      (error) => {
        console.error('Error al cargar periodos:', error);
      }
    );
  }

  cargarLista(): void {
    this.periodoService.getPeriodo().subscribe((per) => (this.periodo = per));
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

}

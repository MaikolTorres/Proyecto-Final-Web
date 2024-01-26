import { Component } from '@angular/core';
import { Cargo } from './cargo';
import { CargoserviceService } from './cargoservice.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarJornadaModalComponent } from '../jornada/actualizar-jornada-modal/actualizar-jornada-modal.component';
import { ActualizarCargoModalComponent } from './actualizar-cargo-modal/actualizar-cargo-modal.component';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
})
export class CargoComponent {
  cargo: Cargo[] = [];

  modalRef: BsModalRef | undefined;
  cargos: Cargo | undefined;

  constructor(
    private cargoService: CargoserviceService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }

  cargarLista(): void {
    this.cargoService.getCargo().subscribe((cargo) => (this.cargo = cargo));
  }

  abrirModalActualizar(cargo: Cargo) {
    const initialState = {
      cargo: cargo, // Cambié 'cargo_id' a 'cargo' para pasar el objeto completo
    };

    // Asignar la jornada al contexto del componente
    this.cargos = cargo;

    this.modalRef = this.modalService.show(ActualizarCargoModalComponent, {
      initialState,
    });
  }
  //
  eliminarCargo(cargoId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar el cargo?')) {
      // Llama al servicio para eliminar la cargo
      this.cargoService.deleteCargo(cargoId).subscribe(
        (data) => {
          console.log('Cargo eliminado con éxito:', data);
          // Aquí puedes realizar acciones adicionales después de la eliminación
        },
        (error) => {
          console.error('Error al eliminar la cargo:', error);
          // Manejar el error según sea necesario
        }
      );
    }
  }
  textoBusqueda: string = '';

  // buscar

  perMatchesSearch(cargo: Cargo): boolean {
    return cargo.cargo_nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '') {
      this.cargo = this.cargo.filter((cargo: Cargo) => this.perMatchesSearch(cargo));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}

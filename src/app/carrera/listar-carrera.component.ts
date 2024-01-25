import { Component } from '@angular/core';
import { CarreraService } from './carrera.service';
import { Carrera } from './carrera';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-carrera',
  templateUrl: './listar-carrera.component.html',
  styleUrls: ['./listar-carrera.component.css']
})
export class ListarCarreraComponent {

  carrera: Carrera[] = [];
  modalRef: BsModalRef | undefined;
  carr: Carrera | undefined;

  constructor(private carreraService: CarreraService) { }

  ngOnInit(): void {
    this.cargarCarrera();
    FormsModule;
  }

  cargarCarrera() {
    this.carreraService.getCarrera().subscribe(
      (data: Carrera[]) => {
        this.carrera = data;
      },
      (error) => {
        console.error('Error al cargar carreras:', error);
      }
    );
  }

  cargarLista(): void {
    this.carreraService.getCarrera().subscribe((carr) => (this.carrera = carr));
  }


  eliminarCarrera(id: number): void{
    
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

}

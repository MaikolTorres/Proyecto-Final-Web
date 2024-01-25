import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeriodoService } from './periodo.service';
import { Periodos } from './periodo';

@Component({
  selector: 'app-crear-periodo',
  templateUrl: './crear-periodo.component.html',
  styleUrls: ['./crear-periodo.component.css']
})
export class CrearPeriodoComponent {

  [x: string]: any;
  nuevoPeriodo: Periodos = new Periodos();
  botonDesactivado: boolean = false;

  constructor(
    private router: Router,
    private periodoService: PeriodoService
  ) {}


  crearPeriodo() {
   
    this.botonDesactivado = true;
  
    this.periodoService.createPeriodo(this.nuevoPeriodo).subscribe(
      (response) => {
        console.log('Periodo creada exitosamente:', response);
        window.close();
      },
      (error) => {
        console.error('Error al crear:', error);
        if (error.status === 401) {
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          alert(error.error.error);
        } else {
          alert('Error al crear periodo. Por favor, inténtelo de nuevo.');
        }
        this.botonDesactivado = false;
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/listar-periodo-actividades']);
  }
}

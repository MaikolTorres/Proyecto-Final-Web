import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesDocente } from './actividades-docente';
import { ActividadesDocenteService } from './actividades-docente.service';

@Component({
  selector: 'app-actividades-docente',
  templateUrl: './actividades-docente.component.html',
  styleUrls: ['./actividades-docente.component.css']
})
export class ActividadesDocenteComponent {

  [x: string]: any;
  nuevaActivi: ActividadesDocente = new ActividadesDocente();
  botonDesactivado: boolean = false;

  constructor(
    private router: Router,
    private service: ActividadesDocenteService
  ) {}

  crearActividadDocente() {
    
    this.botonDesactivado = true;
  
    this.service.createActividades(this.nuevaActivi).subscribe(
      (response) => {
        console.log('Actividad Docente creada exitosamente:', response);
        window.close();
      },
      (error) => {
        console.error('Error al crear:', error);
        if (error.status === 401) {
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          alert(error.error.error);
        } else {
          alert('Error al crear actividad docente. Por favor, inténtelo de nuevo.');
        }
        this.botonDesactivado = false;
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/listar-actividades-docente']);
  }
}

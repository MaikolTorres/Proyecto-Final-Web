import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from './carrera.service';
import { Carrera } from './carrera';

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.css']
})
export class CrearCarreraComponent {
  nuevaCarrera: Carrera = new Carrera;
  botonDesactivado: boolean = false;

  constructor(
    private router: Router,
    private carreraService: CarreraService
  ) { }

  crearCarrera() {
    if (this.camposValidos()) {
      this.botonDesactivado = true;

      this.carreraService.createCarrera(this.nuevaCarrera).subscribe(
        (response) => {
          console.log('Carrera creada exitosamente:', response);
          this.router.navigate(['/listar-carrera']);
        },
        (error) => {
          console.error('Error al crear:', error);
          this.handleErrorResponse(error);
        }
      );
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }

  camposValidos(): boolean {
    return (
      this.nuevaCarrera.carrera_nombre !== undefined &&
      this.nuevaCarrera.carrera_modalidad !== undefined &&
      this.nuevaCarrera.carrera_nombre !== '' &&
      this.nuevaCarrera.carrera_modalidad !== ''
    );
  }

  handleErrorResponse(error: any): void {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    } else if (error.error && error.error.error) {
      alert(error.error.error);
    } else {
      alert('Error al crear Carrera. Por favor, inténtelo de nuevo.');
    }

    this.botonDesactivado = false;
  }

  cancelar(): void {
    this.router.navigate(['/listar-carrera']);
  }

  
}

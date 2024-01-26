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

  [x: string]: any;


  nuevaCarrea: Carrera = new Carrera();
  botonDesactivado: boolean = false;

  constructor(
    private router: Router,
    private carreraService: CarreraService
  ) { }


  crearCarrera() {


    this.botonDesactivado = true;

    this.carreraService.createCarrera(this.nuevaCarrea).subscribe(
      (response) => {
        console.log('Carrera creada exitosamente:', response);
        window.close();
      },
      (error) => {
        console.error('Error al crear:', error);
        if (error.status === 401) {
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          alert(error.error.error);
        } else {
          alert('Error al crear carrera. Por favor, inténtelo de nuevo.');
        }
        this.botonDesactivado = false;
      }
    );

  }

  cancelar(): void {
    this.router.navigate(['/listar-carrera']);
  }

}

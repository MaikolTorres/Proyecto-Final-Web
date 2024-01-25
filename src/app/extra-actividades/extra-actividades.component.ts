import { Component} from '@angular/core';
import { ExtraActividades } from './extra-actividades';
import { ExtraActividadesService } from './extra-actividades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extra-actividades',
  templateUrl: './extra-actividades.component.html',
  styleUrls: ['./extra-actividades.component.css'],
})
export class ExtraActividadesComponent{
  
  [x: string]: any;


  nuevaActividad: ExtraActividades = new ExtraActividades();
  botonDesactivado: boolean = false;

  constructor(
    private router: Router,
    private extraActividadesService: ExtraActividadesService
  ) {}


  crearExtraActividad() {
    this.botonDesactivado = true;
  
    this.extraActividadesService.create(this.nuevaActividad).subscribe(
      (response) => {
        console.log('Actividad creada exitosamente:', response);
        window.close();
      },
      (error) => {
        console.error('Error al crear:', error);
        if (error.status === 401) {
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          alert(error.error.error);
        } else {
          alert('Error al crear actividad. Por favor, inténtelo de nuevo.');
        }
        this.botonDesactivado = false;
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/listar-extra-actividades']);
  }
}

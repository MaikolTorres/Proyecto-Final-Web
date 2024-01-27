import { Component, OnInit} from '@angular/core';
import { ExtraActividades } from './extra-actividades';
import { ExtraActividadesService } from './extra-actividades.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { ActualizarExtraModalComponent } from './actualizar-extra-modal/actualizar-extra-modal.component';

@Component({
  selector: 'app-extra-actividades',
  templateUrl: './extra-actividades.component.html',
  styleUrls: ['./extra-actividades.component.css'],
})
export class ExtraActividadesComponent {
  
  [x: string]: any;
  nuevoextras: ExtraActividades = new ExtraActividades();
  botonDesactivado: boolean = false;
  constructor(private extraService: ExtraActividadesService, private router: Router) { }
  
  
  crearExtras() {

    this.botonDesactivado = true;
  
    this.extraService.create(this.nuevoextras).subscribe(
      (response) => {
        console.log('Actividad extra creada exitosamente:', response);
        window.close();
      },
      (error) => {
  
        console.error('Error al crear la actividad extra:', error);
        if (error.status === 401) {
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          alert(error.error.error);
        } else {
          alert('Error al crear la actividad extra. Por favor, inténtelo de nuevo.');
        }
  
        this.botonDesactivado = false;
      }
    );
  }
  cancelar(): void {
    this.router.navigate(['/listar-extraactividades']);
  }
}

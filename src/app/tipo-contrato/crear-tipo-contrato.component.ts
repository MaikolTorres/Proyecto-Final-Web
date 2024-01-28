import { Component } from '@angular/core';
import { TipoContrato } from './tipo-contrato';
import { TipoContratoService } from './tipo-contrato.service';
import { Router } from '@angular/router';
import { AlertService } from '../service/Alert.service';

@Component({
  selector: 'app-crear-tipo-contrato',
  templateUrl: './crear-tipo-contrato.component.html',
  styleUrls: ['./crear-tipo-contrato.component.css'],
})
export class CrearTipoContratoComponent {
  [x: string]: any;

  nuevoTipoContrato: TipoContrato = new TipoContrato();
  botonDesactivado: boolean = false;

  constructor(
    private tipocontratoService: TipoContratoService,
    private router: Router,
    private alertService: AlertService
  ) {}

  crearTipoContrato() {
    // Desactivar el botón durante la solicitud
    this.botonDesactivado = true;

    this.tipocontratoService.create(this.nuevoTipoContrato).subscribe(
      (response) => {

        console.log('Tipo Contrato creado exitosamente:', response);
        
        this.alertService.notification('Éxito', 'Tipo Contrato creado exitosamente', 'success');

        this.router.navigate(['/tipocontrato']);
      },
      (error) => {
       
        console.error('Error al crear el Tipo Contrato:', error);
        if (error.status === 401) {
          // Redirigir al usuario a la página de inicio de sesión
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          // Muestra el mensaje de error específico del servidor al usuario
          alert(error.error.error);
        } else {
          // Muestra un mensaje de error genérico al usuario
          alert('Error al crear el Tipo Contrato. Por favor, inténtelo de nuevo.');
        }

        // Reactivar el botón después de un error
        this.botonDesactivado = false;
      }
    );
  }

  cancelar(): void {
    // Navegar a la lista de jornadas
    this.router.navigate(['/tipocontrato']);
  }
}

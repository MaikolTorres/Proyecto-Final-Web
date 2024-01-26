import { Component } from '@angular/core';
import { GradoOcupacional } from './grado-ocupacional';
import { Router } from '@angular/router';
import { GradoOcupacionalService } from './grado-ocupacional.service';
import { AlertService } from '../service/Alert.service';

@Component({
  selector: 'app-crear-grado-ocupacional',
  templateUrl: './crear-grado-ocupacional.component.html',

  styleUrls: ['./crear-grado-ocupacional.component.css']
})
export class CrearGradoOcupacionalComponent {

  [x: string]: any;

  nuevoGrado: GradoOcupacional = new GradoOcupacional();
  botonDesactivado: boolean = false;

  constructor(private GradoService: GradoOcupacionalService, private router: Router, private alertService: AlertService) { }

  crearGrado() {
    // Desactivar el botón durante la solicitud
    this.botonDesactivado = true;

    this.alertService.question(
      '¿Crear grado ocupacional?',
      '',
      true, // Mostrar botón de confirmación
      true, // Mostrar botón de cancelar
      'Confirmar', // Texto del botón de confirmación
      'Cancelar', // Texto del botón de cancelar
      'assets/icons/check.png' // Opcional: URL de la imagen
    ).then((result) => {
      if (result) {
        // Si se confirma la pregunta, realizar la solicitud HTTP
        this.GradoService.create(this.nuevoGrado).subscribe(
          (response) => {
            // Éxito
            console.log('Grado creada exitosamente:', response);
            // Resto de la lógica después de la creación exitosa

            // Cerrar la ventana después de guardar la jornada
            window.close();
          },
          (error) => {
            // Manejo de errores
            console.error('Error al crear grado ocupacional:', error);
            if (error.status === 401) {
              // Redirigir al usuario a la página de inicio de sesión
              this['router'].navigate(['/login']);
            } else if (error.error && error.error.error) {
              // Muestra el mensaje de error específico del servidor al usuario
              alert(error.error.error);
            } else {
              // Muestra un mensaje de error genérico al usuario
              alert('Error al crear grado ocupacional. Por favor, inténtelo de nuevo.');
            }

            // Reactivar el botón después de un error
            this.botonDesactivado = false;
          }
        );
      } else {
        // Si se cancela la pregunta, no realizar ninguna acción
        console.log('La creación del grado fue cancelada.');
        // Reactivar el botón después de la cancelación
        this.botonDesactivado = false;
      }
    });
  }

  cancelar(): void {
    // Navegar a la lista de grados
    this.router.navigate(['/listarGrado']);
  }

}

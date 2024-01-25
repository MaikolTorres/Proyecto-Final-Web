import { Component } from '@angular/core';
import { GradoOcupacional } from './grado-ocupacional';
import { Router } from '@angular/router';
import { GradoOcupacionalService } from './grado-ocupacional.service';

@Component({
  selector: 'app-crear-grado-ocupacional',
  templateUrl: './crear-grado-ocupacional.component.html',

  styleUrls: ['./crear-grado-ocupacional.component.css']
})
export class CrearGradoOcupacionalComponent {

  [x: string]: any;

  nuevoGrado: GradoOcupacional = new GradoOcupacional();
  botonDesactivado: boolean = false;

  constructor(private GradoService: GradoOcupacionalService, private router: Router) { }

  crearGrado() {
  // Desactivar el botón durante la solicitud
  this.botonDesactivado = true;

  this.GradoService.create(this.nuevoGrado).subscribe(
    (response) => {
      // Éxito
      if (response.status === 201) {
        console.log('Grado creado exitosamente:', response);

        setTimeout(() => {
          window.close();
        }, 100);
      } else {
        console.error('Error: El servidor respondió con un código de estado inesperado:', response.status);
        alert('Error al crear el grado ocupacional. Por favor, inténtelo de nuevo.');
      }
    },
    (error) => {
      // Manejo de errores
      console.error('Error al crear el grado ocupacional:', error);
      if (error.status === 401) {
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      } else if (error.error && error.error.error) {
        // Mostrar el mensaje de error específico del servidor al usuario
        alert(error.error.error);
      } else {
        // Mostrar un mensaje de error genérico al usuario
        alert('Error al crear el grado ocupacional. Por favor, inténtelo de nuevo.');
      }

      // Reactivar el botón después de un error
      this.botonDesactivado = false;
    }
  );
}
  cancelar(): void {
    // Navegar a la lista de grados
    this.router.navigate(['/listarGrado']);
  }

}

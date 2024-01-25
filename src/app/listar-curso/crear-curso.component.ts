import { Component } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent {
  [x: string]: any;

  nuevo: Curso = new Curso();
  botonDesactivado: boolean = false;

  constructor(private cursoService: CursoService, private router: Router) { }

  crearCurso() {
    // Desactivar el botón durante la solicitud
    this.botonDesactivado = true;
  
    this.cursoService.create(this.nuevo).subscribe(
      (response) => {
        // Éxito
        console.log('Curso creada exitosamente:', response);
        // Resto de la lógica después de la creación exitosa
  
        // Cerrar la ventana después de guardar la jornada
        window.close();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al crear curso:', error);
        if (error.status === 401) {
          // Redirigir al usuario a la página de inicio de sesión
          // Redirigir al usuario a la página de inicio de sesión
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          // Muestra el mensaje de error específico del servidor al usuario
          alert(error.error.error);
        } else {
          // Muestra un mensaje de error genérico al usuario
          alert('Error al crear. Por favor, inténtelo de nuevo.');
        }
  
        // Reactivar el botón después de un error
        this.botonDesactivado = false;
      }
    );
  }
  cancelar(): void {
    // Navegar a la lista de jornadas
    this.router.navigate(['/listarcurso']);
  }

}

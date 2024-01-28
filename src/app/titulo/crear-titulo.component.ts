import { Component } from '@angular/core';
import { Titulo } from './titulo';
import { TituloService } from './titulo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-titulo',
  templateUrl: './crear-titulo.component.html',
  styleUrls: ['./crear-titulo.component.css']
})
export class CrearTituloComponent {
  [x: string]: any;
  nuevoTitu: Titulo = new Titulo();
  botonDesactivado: boolean = false;
  constructor(private tituloService: TituloService, private router: Router) { }
  creartitulo() {
    this.botonDesactivado = true;
  
    this.tituloService.create(this.nuevoTitu).subscribe(
      (response) => {
        console.log('titulo creada exitosamente:', response);
        window.close();
      },
      (error) => {
        console.error('Error al crear el titulo:', error);
        if (error.status === 401) {
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          alert(error.error.error);
        } else {
          alert('Error al crear la titulo. Por favor, inténtelo de nuevo.');
        }
  
        this.botonDesactivado = false;
      }
    );
  }
  cancelar(): void {
    this.router.navigate(['/titulo']);
  }
}


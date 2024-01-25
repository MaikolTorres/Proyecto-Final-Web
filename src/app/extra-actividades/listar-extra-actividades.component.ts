import { Component, OnInit } from '@angular/core';
import { ExtraActividadesService } from './extra-actividades.service';
import { Router } from '@angular/router';
import { ExtraActividades } from './extra-actividades';


@Component({
  selector: 'app-listar-extra-actividades',
  templateUrl: './listar-extra-actividades.component.html',
  styleUrls: ['./listar-extra-actividades.component.css']
})

export class ListarExtraActividadesComponent implements OnInit {
  actividades: ExtraActividades[] = [];

  constructor(private extraActividadesService: ExtraActividadesService, private router: Router) { }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades() {
    this.extraActividadesService.getAll().subscribe(
      (data: ExtraActividades[]) => {
        this.actividades = data;
      },
      (error) => {
        console.error('Error al cargar actividades:', error);
      }
    );
  }

  editarActividad(id: number): void {
    this.router.navigate(['/extra-actividades'], { queryParams: { editar: id } });
  }

  eliminarActividad(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta actividad extra?')) {
      this.extraActividadesService.delete(id).subscribe(
        data => {
          console.log('Actividad eliminada con éxito:', data);
        },
        error => {
          console.error('Error al eliminar actividad', error);
        }
      );
    }
  }
}

import { Component } from '@angular/core';
import { ActividadesNoDocente } from './actividades-no-docente';
import { ActividadNoDocenteService } from './actividad-no-docente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Docente } from '../docente/docente';
import { DocenteService } from '../docente/docente.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actividades-no-docente',
  templateUrl: './actividades-no-docente.component.html',
  styleUrls: ['./actividades-no-docente.component.css'],
})
export class ActividadesNoDocenteComponent {
  nodocentes1: ActividadesNoDocente[] = [];
  nuevaActividadNoDocente: ActividadesNoDocente = new ActividadesNoDocente();

  docente1: Docente[] = [];
  createdocente: Docente = new Docente();
  public nombreDocSeleecionada: string = '';

  isLoading: boolean = true;
  botonDesactivado: boolean = false;

  actividad_nombre: string = '';
  actividad_horas: number = 0;

  constructor(
    private actividadService: ActividadNoDocenteService,
    private router: Router,
    public modalRef: BsModalRef,
    private docenteService: DocenteService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cargarDocente();
    this.cargarListadoc();
  }

  getDocente(): Observable<Docente[]> {
    return this.http.get<Docente[]>('http://localhost:8080/docente');
  }
  cargarDocente() {
    this.getDocente().subscribe((docentes) => (this.docente1 = docentes));
  }
  cargarListadoc(): void {
    this.actividadService.getdoccente().subscribe(
      (doscc) => {
        this.docente1 = doscc;
        this.isLoading = false;
        console.log('Docentes cargados exitosamente:', doscc);
      },
      (error) => {
        console.error('Error al cargar los docentes:', error);
        this.isLoading = false;
      }
    );
  }
  onDocSelected(event: any) {
    this.nombreDocSeleecionada = event.target.value;
    const nombre = this.nombreDocSeleecionada;
    this.docenteService.getDocentesByName(nombre).subscribe(
      (docente: Docente | undefined) => {
        if (docente) {
          this.createdocente = docente;
          console.log('Docente encontrado:', this.createdocente);
        } else {
          console.log('Docente no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener el docente:', error);
      }
    );
  }

  crearActividades() {
    this.nuevaActividadNoDocente.modeloDocente = this.createdocente;
    this.nuevaActividadNoDocente.activinodoc_nombre = this.actividad_nombre;
    this.nuevaActividadNoDocente.activinodoc_num_horas = this.actividad_horas;
    this.actividadService.create(this.nuevaActividadNoDocente).subscribe(
      (response) => {
        console.log('Actividad creada exitosamente:', response);
        this.router.navigate(['/listar-actividades-no-docentes']);
      },
      (error) => {
        console.error('Error al crear la actividad:', error);
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/listar-actividades-no-docentes']);
  }
}

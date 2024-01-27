import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesDocente } from './actividades-docente';
import { ActividadesDocenteService } from './actividades-docente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asignatura } from '../asignatura/asignatura';
import { ExtraActividades } from '../extra-actividades/extra-actividades';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actividades-docente',
  templateUrl: './actividades-docente.component.html',
  styleUrls: ['./actividades-docente.component.css']
})
export class ActividadesDocenteComponent implements OnInit {
  @Input() actividad: ActividadesDocente | undefined;
  actividoc_id: number | undefined;
  updateForm!: FormGroup;
  actividad1: ActividadesDocente[] = [];

  asignatura: Asignatura[] = [];
  asignatura1: Asignatura[] = [];
  
  extra: ExtraActividades[] = [];
  extra1: ExtraActividades[] = [];
  


  isLoading: boolean = true;
  nuevoActi: ActividadesDocente = new ActividadesDocente();
  botonDesactivado: boolean = false;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private actividadService: ActividadesDocenteService,
    private http: HttpClient,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.createForm();
    
    this.cargarAsignaturas();
    this.cargarListaAs();

    this.cargarExtras();
    this.cargarListaExtr();

    this.loadGradoDetails();

  }


  createForm() {
    this.updateForm = this.fb.group({
      actividoc_nombre_actividad: ['', Validators.required],
      actividoc_horas_docencia: ['', Validators.required], // Corregir el nombre del campo
      asignatura_id: ['', Validators.required],
      extraactividad_id: ['', Validators.required]
    });
  }


  getAsignatura(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>('http://localhost:8080/asignatura');
  }

  cargarAsignaturas() {
    this.getAsignatura().subscribe((asignaturas) => (this.asignatura = asignaturas));
  }


  getExtrass(): Observable<ExtraActividades[]> {
    return this.http.get<ExtraActividades[]>('http://localhost:8080/docente');
  }

  cargarExtras() {
    this.getExtrass().subscribe((extras) => (this.extra = extras));
  }



  loadGradoDetails() {
    if (this.actividad && this.actividad.actividoc_id) {
      this.actividoc_id = this.actividad.actividoc_id;
      this.actividadService.getactividadId(this.actividoc_id).subscribe(
        (curso: ActividadesDocente) => {
          this.updateForm.patchValue({
            actividoc_nombre: curso.actividoc_nombre_actividad,
            actividoc_nombre_horas: curso.actividoc_horas_docencia,
            asignatura_id: curso.modeloAsignaturas.asignatura_id,
            extra_id: curso.modeloExtrasActividades.extra_id,
          });
        },
        (error) => {
          console.error('Error al cargar detalles del curso:', error);
        }
      );
    }
  }


  cargarListaAs(): void {
    this.actividadService.getasiggg().subscribe(
      (asid) => {
        this.asignatura1 = asid;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las asignaturas:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListaExtr(): void {
    this.actividadService.getextrasss().subscribe(
      (docc) => {
        this.extra1 = docc;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los actividades extras:', error);
        this.isLoading = false;
      }
    );
  }
  
  

  crearAct() {
    this.botonDesactivado = true;
  
    const formData = this.updateForm.value;
  
    this.actividadService.createActividades(formData).subscribe(
      (response) => {
        // Éxito
        console.log('Usuario creado exitosamente:', response);
        // Resto de la lógica después de la creación exitosa
  
        // Cerrar la ventana después de guardar la jornada
        window.close();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al crear el actividad:', error);
        if (error.status === 401) {
          // Redirigir al usuario a la página de inicio de sesión
          this.router.navigate(['/login']);
        } else if (error.error && error.error.error) {
          // Muestra el mensaje de error específico del servidor al usuario
          alert(error.error.error);
        } else {
          // Muestra un mensaje de error genérico al usuario
          alert('Error al crear la actividad. Por favor, inténtelo de nuevo.');
        }
  
        // Reactivar el botón después de un error
        this.botonDesactivado = false;
      }
    );
  }


  cancelar(): void {
    this.router.navigate(['/listar-actividades-docente']);
  }
}


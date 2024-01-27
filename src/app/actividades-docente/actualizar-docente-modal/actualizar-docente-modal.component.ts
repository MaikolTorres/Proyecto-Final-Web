import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ActividadesDocente } from '../actividades-docente';
import { ActividadesDocenteService } from '../actividades-docente.service';
import { Asignatura } from 'src/app/asignatura/asignatura';
import { ExtraActividades } from 'src/app/extra-actividades/extra-actividades';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actualizar-docente-modal',
  templateUrl: './actualizar-docente-modal.component.html',
  styleUrls: ['./actualizar-docente-modal.component.css']
})
export class ActualizarDocenteModalComponent implements OnInit {

  @Input() actividad: ActividadesDocente | undefined;
  actividoc_id: number | undefined;
  updateForm!: FormGroup;
  actividad1: ActividadesDocente[] = [];


  asignatura: Asignatura[] = [];
  asignatura1: Asignatura[] = [];
  
  extras: ExtraActividades[] = [];
  extras1: ExtraActividades[] = [];
  
  isLoading: boolean = true;


  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private Activvidadservice: ActividadesDocenteService,
    private http: HttpClient,
    private router: Router

  ) {}
  ngOnInit() {
    this.createForm();
  
    this.cargarAsignaturas();
    this.cargarExtras();
    this.loadDetails(); // Llama a loadDetails después de cargar las asignaturas y extras
    this.cargarListaAsignatura();
    this.cargarListaExtr();
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
    this.getExtrass().subscribe((extras) => (this.extras = extras));
  }


  loadDetails() {
    if (this.actividoc_id) {
      this.Activvidadservice.getactividadId(this.actividoc_id).subscribe(
        (asigg: ActividadesDocente) => {
          this.updateForm.patchValue({
            actividoc_nombre: asigg.actividoc_nombre_actividad,
            actividoc_num_horas: asigg.actividoc_horas_docencia,
            asignatura_id: asigg.modeloAsignaturas.asignatura_id,
            extra_id: asigg.modeloExtrasActividades.extra_id,

          });
        },
        error => {
          console.error('Error al cargar detalles de la actividad:', error);
        }
      );
    }
  }


  
  cargarListaAsignatura(): void {
    this.Activvidadservice.getasiggg().subscribe(
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
    this.Activvidadservice.getextrasss().subscribe(
      (docc) => {
        this.extras1 = docc;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los actividades extras:', error);
        this.isLoading = false;
      }
    );
  }
  
  createForm() {
    this.updateForm = this.fb.group({
      actividoc_nombre: ['', Validators.required],
      actividoc_num_horas: ['', Validators.required],
      asignatura_id: ['', Validators.required],
      extra_id: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.updateForm.valid && this.updateForm.valid) {
      const updated = this.updateForm.value;
      updated.actividoc_id = this.actividad?.actividoc_id || 0;

      console.log('Actividad ID seleccionado:', updated.usu_id);
      if (!updated.usu_id) {
        console.error('Error: ID de asignatura no es válido');
        return;
      }

      this.Activvidadservice.updateActividad(updated).subscribe(
        data => {
          console.log('Actividad actualizado con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana desplegable después de la actualización
        },
        error => {
          console.error('Error al actualizar la Actividad:', error);

          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    }
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Asignatura } from '../asignatura';
import { Curso } from 'src/app/listar-curso/curso';
import { Docente } from 'src/app/docente/docente';
import { AsignaturaService } from '../asignatura.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-asignatura-modal',
  templateUrl: './actualizar-asignatura-modal.component.html',
  styleUrls: ['./actualizar-asignatura-modal.component.css']
})
export class ActualizarAsignaturaModalComponent implements OnInit {
  @Input() asignatura: Asignatura | undefined;
  asignatura_id: number | undefined;
  updateForm!: FormGroup;
  asignatura1: Asignatura[] = [];

  curso: Curso[] = [];
  curso1: Curso[] = [];
  
  docente: Docente[] = [];
  docente1: Docente[] = [];
  
  isLoading: boolean = true;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private asignaturaService: AsignaturaService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  
    this.cargarCursos();
    this.cargarListaCu();

    this.cargarDocentes();
    this.cargarListaDoc();

    this.loadDetails();

  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>('http://localhost:8080/curso');
  }

  
  cargarCursos() {
    this.getCursos().subscribe((cursos) => (this.curso = cursos));
  }

 

  
  getDocc(): Observable<Docente[]> {
    return this.http.get<Docente[]>('http://localhost:8080/docente');
  }

  cargarDocentes() {
    this.getDocc().subscribe((docentes) => (this.docente = docentes));
  }


  createForm() {
    this.updateForm = this.fb.group({
      asignatura_nombre: ['', Validators.required],
      asignatura_horas_clase_semana: ['', Validators.required], // Corregir el nombre del campo
      curso_id: ['', Validators.required],
      docente_id: ['', Validators.required]
    });
  }


  cargarListaCu(): void {
    this.asignaturaService.getcursss().subscribe(
      (curr) => {
        this.curso1 = curr;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las carreras:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListaDoc(): void {
    this.asignaturaService.getdoccente().subscribe(
      (docc) => {
        this.docente1 = docc;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los periodos:', error);
        this.isLoading = false;
      }
    );
  }
  

  loadDetails() {
    if (this.asignatura_id) {
      this.asignaturaService.getasignaturaId(this.asignatura_id).subscribe(
        (asigg: Asignatura) => {
          this.updateForm.patchValue({
            asignatura_nombre: asigg.asignatura_nombre,
            asignatura_horas_clase_semana: asigg.asignatura_horas_clase_semana,
            curso_id: asigg.curso.curso_id,
            docente_id: asigg.modeloDocente.docente_id,
          });
        },
        error => {
          console.error('Error al cargar detalles del usuario:', error);
        }
      );
    }
  }


  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updated = this.updateForm.value;
      updated.asignatura_id = this.asignatura?.asignatura_id || 0;

      console.log('Asignatura ID seleccionado:', updated.usu_id);
      if (!updated.usu_id) {
        console.error('Error: ID de asignatura no es válido');
        return;
      }

      this.asignaturaService.updateAsignatura(updated).subscribe(
        data => {
          console.log('Asignatura actualizado con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana desplegable después de la actualización
        },
        error => {
          console.error('Error al actualizar la Asignatura:', error);

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

import { Component, Input, OnInit } from '@angular/core';
import { Asignatura } from '../asignatura/asignatura';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from '../listar-curso/curso';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AsignaturaService } from '../asignatura/asignatura.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Docente } from '../docente/docente';
@Component({
  selector: 'app-crear-asignatura',
  templateUrl: './crear-asignatura.component.html',
  styleUrls: ['./crear-asignatura.component.css']
})
export class CrearAsignaturaComponent implements OnInit {
  @Input() asignatura: Asignatura | undefined;
  asignatura_id: number | undefined;
  updateForm!: FormGroup;
  asignatura1: Asignatura[] = [];

  curso: Curso[] = [];
  curso1: Curso[] = [];
  
  docente: Docente[] = [];
  docente1: Docente[] = [];
  


  isLoading: boolean = true;
  nuevoUsu: Asignatura = new Asignatura();
  botonDesactivado: boolean = false;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private asignaturaService: AsignaturaService,
    private http: HttpClient,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.createForm();
    
    this.cargarCursos();
    this.cargarListaCu();

    this.cargarDocentes();
    this.cargarListaDoc();

    this.loadGradoDetails();

  }


  createForm() {
    this.updateForm = this.fb.group({
      asignatura_nombre: ['', Validators.required],
      asignatura_horas_clase_semana: ['', Validators.required], // Corregir el nombre del campo
      curso_id: ['', Validators.required],
      docente_id: ['', Validators.required]
    });
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



  loadGradoDetails() {
    if (this.asignatura && this.asignatura.asignatura_id) {
      this.asignatura_id = this.asignatura.asignatura_id;
      this.asignaturaService.getasignaturaId(this.asignatura_id).subscribe(
        (curso: Asignatura) => {
          this.updateForm.patchValue({
            asignatura_nombre: curso.asignatura_nombre,
            asignatura_horas_clase_semana: curso.asignatura_horas_clase_semana,
            docente_id: curso.modeloDocente.docente_id,
            curso_id: curso.curso.curso_id,
          });
        },
        (error) => {
          console.error('Error al cargar detalles del curso:', error);
        }
      );
    }
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
  
  

  crearUsu() {
    this.botonDesactivado = true;
  
    const formData = this.updateForm.value;
  
    this.asignaturaService.create(formData).subscribe(
      (response) => {
        // Éxito
        console.log('Usuario creado exitosamente:', response);
        // Resto de la lógica después de la creación exitosa
  
        // Cerrar la ventana después de guardar la jornada
        window.close();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al crear el usuario:', error);
        if (error.status === 401) {
          // Redirigir al usuario a la página de inicio de sesión
          this.router.navigate(['/login']);
        } else if (error.error && error.error.error) {
          // Muestra el mensaje de error específico del servidor al usuario
          alert(error.error.error);
        } else {
          // Muestra un mensaje de error genérico al usuario
          alert('Error al crear el usuario. Por favor, inténtelo de nuevo.');
        }
  
        // Reactivar el botón después de un error
        this.botonDesactivado = false;
      }
    );
  }


  cancelar(): void {
    this.router.navigate(['/asignatura']);
  }
}


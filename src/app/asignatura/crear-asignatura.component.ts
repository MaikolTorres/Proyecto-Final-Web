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
import { CursoService } from '../listar-curso/curso.service';
import { DocenteService } from '../docente/docente.service';
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
  nuevaAsignatura: Asignatura = new Asignatura();

  curso1: Curso[] = [];
  createcurso: Curso= new Curso();
  public  nombreCursoSelecionada: string = '';
  

  docente1: Docente[] = [];
  createdocente: Docente= new Docente();
  public  nombreDocSeleecionada: string = '';


  isLoading: boolean = true;
  botonDesactivado: boolean = false;

  asignatura_nombre: string = '';
  asignatura_horas_clase_semana: number = 0;




  constructor(private asignaturaService: AsignaturaService, private router: Router,
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private cursoService: CursoService,
    private docenteService: DocenteService,

  ) {
    this.createForm();

  }

  ngOnInit() {
    this.createForm();
    this.cargarCurso();
    this.cargarListaCur();

    this.cargarDocente();
    this.cargarListadoc();

  }
  initializeForm() {
    this.createForm();
  }



  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>('http://localhost:8080/curso');
  }

  cargarCurso() {
    this.getCursos().subscribe((cursos) => (this.curso1 = cursos));
  }


  getDocente(): Observable<Docente[]> {
    return this.http.get<Docente[]>('http://localhost:8080/docente');
  }

  cargarDocente() {
    this.getDocente().subscribe((docentes) => (this.docente1 = docentes));
  }

  createForm() {
    this.updateForm = this.fb.group({
      asignatura_nombre: ['', Validators.required],
      asignatura_horas_clase_semana: ['', Validators.required],
      curso_id: ['', Validators.required],
      docente_id: ['', Validators.required],
    });
  }



  cargarListaCur(): void {
    this.asignaturaService.getcursss().subscribe(
      cursos => {
        this.curso1 = cursos;
        this.isLoading = false;
        console.log('Cursos cargados exitosamente:', cursos);
      },
      error => {
        console.error('Error al cargar los cursos:', error);
        this.isLoading = false;
      }
    );
  }


  cargarListadoc(): void {
    this.asignaturaService.getdoccente().subscribe(
      doscc => {
        this.docente1 = doscc;
        this.isLoading = false;
        console.log('Docentes cargados exitosamente:', doscc);
      },
      error => {
        console.error('Error al cargar los docentes:', error);
        this.isLoading = false;
      }
    );
  }

  onCursoSelected(event: any) {
    this.nombreCursoSelecionada = event.target.value;
    const nombre = this.nombreCursoSelecionada;
    this.cursoService.getCursoByNombre(nombre).subscribe(
      (curso: Curso | undefined) => {
        if (curso) {
          
        
          this.createcurso=curso;
          console.log('Curso encontrado:',  this.createcurso);

        } else {
          console.log('Curso no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener el curso:', error);
      }
    );
  }

  

  onDocSelected(event: any) {
    this.nombreDocSeleecionada = event.target.value;
    const nombre = this.nombreDocSeleecionada;
    this.docenteService.getDocentesByName(nombre).subscribe(
      (docente: Docente | undefined) => {
        if (docente) {
          
        
          this.createdocente=docente;
          console.log('Docente encontrado:',  this.createdocente);

        } else {
          console.log('Docente no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener el docente:', error);
      }
    );
  }



  crearAsignatura() {
    this.nuevaAsignatura.curso = this.createcurso;
    this.nuevaAsignatura.modeloDocente = this.createdocente;
    this.nuevaAsignatura.asignatura_nombre = this.asignatura_nombre;
    this.nuevaAsignatura.asignatura_horas_clase_semana = this.asignatura_horas_clase_semana;
    this.asignaturaService.create(this.nuevaAsignatura).subscribe(
      (response) => {

        console.log('Asignatura creado exitosamente:', response);
        this.router.navigate(['/asignatura']);
        
      },
      (error) => {
        console.error('Error al crear la asignatura:', error);
      }
    );
  }

  
  cancelar(): void {
    this.router.navigate(['/asignatura']);
  }




}

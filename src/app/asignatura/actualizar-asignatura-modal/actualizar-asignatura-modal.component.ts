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
import { CursoService } from 'src/app/listar-curso/curso.service';
import { DocenteService } from 'src/app/docente/docente.service';

@Component({
  selector: 'app-actualizar-asignatura-modal',
  templateUrl: './actualizar-asignatura-modal.component.html',
  styleUrls: ['./actualizar-asignatura-modal.component.css']
})
export class ActualizarAsignaturaModalComponent implements OnInit {
  @Input() asignatura: Asignatura | undefined;
  asignatura_id: number | undefined;
  updateForm!: FormGroup;
  asignatura2: Asignatura = new Asignatura();

  cursos: Curso[] = [];
  curso2: Curso[] = [];
  ckeckcurso: string = '';
  
  
  docentes: Docente[] = [];
  docente2: Docente[] = [];
  ckeckdocente: string = '';
  
  isLoading: boolean = true;



  public curso_idreceptor : number= 0;
  public asignatura_idreceptor : number= 0;
  public docente_idreceptor : number= 0;
  public asignatura_nombre_receptor : string= '';
  public asignatura_horas_clase_semana_receptor  : number= 0;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private asignaturaService: AsignaturaService,
    private http: HttpClient,
    private router: Router,
    private cursoService: CursoService,
    private docenteService: DocenteService

  ) {
    ///primero se debe inicializar antes de asignarles los valores
    this.asignatura2.curso = new Curso();
    this.asignatura2.modeloDocente = new Docente();
  }

  ngOnInit() {
    this.loadCursos();
    this.loadDocentes();
    this.createForm();
    this.populateFormWithJornadaData();

  }

  


 loadCursos() {
  this.cursoService.get().subscribe(
    (cursos: Curso[]) => {
      this.cursos = cursos;
      this.isLoading = false;
      this.populateFormWithJornadaData();
    },
    error => {
      console.error('Error al cargar los cursos:', error);
      this.isLoading = false;
    }
  );
}

  
loadDocentes() {
  this.docenteService.getDocentes().subscribe(
    (docentes: Docente[]) => {
      this.docentes = docentes;
      this.isLoading = false;
      this.populateFormWithJornadaData();
    },
    error => {
      console.error('Error al cargar los docentes:', error);
      this.isLoading = false;
    }
  );
}

createForm() {
  this.updateForm = this.fb.group({
    asignatura_nombre: ['', Validators.required],
    asignatura_horas_clase_semana: ['', Validators.required],
    curso_id: ['', Validators.required],
    docente_id: ['', Validators.required],
  });
}
  

populateFormWithJornadaData() {
  if (this.asignatura && this.docentes.length > 0 && this.cursos.length > 0) {
    const selectedCurso = this.cursos.find(curso => curso.curso_id === this.asignatura?.curso.curso_id);
    const selectedDocente = this.docentes.find(docente => docente.docente_id === this.asignatura?.modeloDocente.docente_id);

    this.updateForm.patchValue({
      asignatura_nombre: this.asignatura.asignatura_nombre,
      asignatura_horas_clase_semana: this.asignatura.asignatura_horas_clase_semana,
      curso_id: selectedCurso ? selectedCurso.curso_id : null,
      docente_id: selectedDocente ? selectedDocente.docente_id : null, // Cambiado de 'c' a 'docente_id'
    });

    console.log('Datos que se van a actualizar:', {
      asignatura_nombre: this.asignatura.asignatura_nombre,
      asignatura_horas_clase_semana: this.asignatura.asignatura_horas_clase_semana,
      curso_id: selectedCurso ? selectedCurso.curso_id : null,
      docente_id: selectedDocente ? selectedDocente.docente_id : null,
    });
  }
}



oncursoSelected(event: any) {
  const selectedCursoId = event.target.value;
  console.log('ID de curso seleccionada:', selectedCursoId);
  this.curso_idreceptor = selectedCursoId;
}
ondocenteSelected(event: any) {
  const selectedDocenteId = event.target.value;
  console.log('ID de docente seleccionada:', selectedDocenteId);
  this.docente_idreceptor = selectedDocenteId;
}



  
onSubmit() {
  if (this.updateForm && this.updateForm.valid) {
    const updatedAsig = this.updateForm.value;
    updatedAsig.asignatura_id = this.asignatura?.asignatura_id || 0;
     this.asignatura_idreceptor= updatedAsig.asignatura_id;
     this.docente_idreceptor = updatedAsig.docente_id;
     this.curso_idreceptor = updatedAsig.curso_id;


    if (!updatedAsig.asignatura_id) {
      console.error('Error: ID de usuario no válido');
      return;
    }


    this.asignatura_nombre_receptor = updatedAsig.asignatura_nombre;
    this.asignatura_horas_clase_semana_receptor = updatedAsig.asignatura_horas_clase_semana;
 
    console.log('Se enviará curso_idreceptor:', this.curso_idreceptor);
    console.log('Se enviará docente_idreceptor:', this.docente_idreceptor);
    console.log('Se enviará nombreAsig_idreceptor:', this.asignatura_nombre_receptor);
    console.log('Se enviará horas_idreceptor:', this.asignatura_horas_clase_semana_receptor);
    this.asignatura2.asignatura_id=this.asignatura_idreceptor;
    this.asignatura2.asignatura_nombre= this.asignatura_nombre_receptor;
    this.asignatura2.asignatura_horas_clase_semana=this.asignatura_horas_clase_semana_receptor;
    this.asignatura2.curso.curso_id  =  this.curso_idreceptor;
    this.asignatura2.modeloDocente.docente_id=this.docente_idreceptor;


    console.log( this.asignatura2);
    this.asignaturaService.updateAsignatura(this.asignatura2).subscribe(
      (updatedAsig: Asignatura) => {
        console.log('Asignatura actualizado con éxito:', updatedAsig);
        window.location.reload();

        window.close;

        console.log()
      },
      error => {
        console.error('Error al actualizar la Asignatura:', error);
            window.location.reload();

        window.close;
      }
    );
  }
}
}

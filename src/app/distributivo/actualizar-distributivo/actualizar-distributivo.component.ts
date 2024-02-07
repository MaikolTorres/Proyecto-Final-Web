import { Component, Input, OnInit } from '@angular/core';
import { Distributivo } from '../Distributivo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/listar-curso/curso';
import { Docente } from 'src/app/docente/docente';
import { Carrera } from 'src/app/carrera/carrera';
import { Jornada } from 'src/app/jornada/jornada';
import { Periodos } from 'src/app/periodos/periodo';
import { Asignatura } from 'src/app/asignatura/asignatura';
import { ActividadesDocente } from 'src/app/actividades-docente/actividades-docente';
import { ActividadesNoDocente } from 'src/app/actividades-no-docente/actividades-no-docente';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/listar-curso/curso.service';
import { DocenteService } from 'src/app/docente/docente.service';
import { AsignaturaService } from 'src/app/asignatura/asignatura.service';
import { CarreraService } from 'src/app/carrera/carrera.service';
import { JornadaService } from 'src/app/jornada/jornada.service';
import { PeriodoService } from 'src/app/periodos/periodo.service';
import { ActividadNoDocenteService } from 'src/app/actividades-no-docente/actividad-no-docente.service';
import { ActividadesDocenteService } from 'src/app/actividades-docente/actividades-docente.service';
import { DistributivoService } from '../distributivo.service';

@Component({
  selector: 'app-actualizar-distributivo',
  templateUrl: './actualizar-distributivo.component.html',
  styleUrls: ['./actualizar-distributivo.component.css']
})
export class ActualizarDistributivoComponent implements OnInit {
  @Input() distributivo: Distributivo | undefined;
  asignatura_id: number | undefined;
  updateForm!: FormGroup;
  distibutivo2: Distributivo = new Distributivo();

  carreras: Carrera[] = [];
  carrera2: Carrera[] = [];

  jornadas: Jornada[] = [];
  jornada2: Jornada[] = [];

  cursos: Curso[] = [];
  curso2: Curso[] = [];
  
  periodos: Periodos[] = [];
  periodo2: Periodos[] = [];


  asignaturas: Asignatura[] = [];
  asignatura2: Asignatura[] = [];
  

  actcDocentes: ActividadesDocente[] = [];
  actcDocente2: ActividadesDocente[] = [];
  
  
  actcNODocentes: ActividadesNoDocente[] = [];
  actcNODocente2: ActividadesNoDocente[] = [];
  
  
  docentes: Docente[] = [];
  docente2: Docente[] = [];
  ckeckdocente: string = '';
  
  isLoading: boolean = true;


  public distributivo_idreceptor : number= 0;
  public carrera_idreceptor : number= 0;
  public jornada_idreceptor : number= 0;
  public curso_idreceptor : number= 0;
  public periodo_idreceptor : number= 0;
  public asignatura_idreceptor : number= 0;
  public actDoc_idreceptor : number= 0;
  public actNODoc_idreceptor : number= 0;
  public docente_idreceptor : number= 0;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,

    private distributivoService: DistributivoService,

    private carreraService: CarreraService,
    private jornadaService: JornadaService,
    private cursoService: CursoService,
    private periodoService: PeriodoService,
    private asignaturaService: AsignaturaService,
    private actDocService: ActividadesDocenteService,
    private actNODocService: ActividadNoDocenteService,
    private docenteService: DocenteService

  ) {
    ///primero se debe inicializar antes de asignarles los valores
    this.distibutivo2.modeloCurso = new Curso();
    this.distibutivo2.modeloDocente = new Docente();
    this.distibutivo2.modeloCarrera = new Carrera();
    this.distibutivo2.modeloDocente = new Docente();
    this.distibutivo2.modeloJordana = new Jornada();
    this.distibutivo2.modeloPeriodos = new Periodos();
    this.distibutivo2.modeloAsignaturas = new Asignatura();
    this.distibutivo2.modeloActividadesDocentes = new ActividadesDocente();
    this.distibutivo2.modeloActividadesNoDocentes = new ActividadesNoDocente();

  }

  ngOnInit() {
    this.loadCarreras();
    this.loadJornadas();
    this.loadCursos();
    this.loadPeriodos();
    this.loadAsignaturas();
    this.loadActividadDoc();
    this.loadActividadNODoc();
    this.loadDocentes();

    this.createForm();
    this.populateFormWithJornadaData();

  }

  loadCarreras() {
    this.carreraService.getCarrera().subscribe(
      (carreras: Carrera[]) => {
        this.carreras = carreras;
        this.isLoading = false;
        this.populateFormWithJornadaData();
      },
      error => {
        console.error('Error al cargar las carreras:', error);
        this.isLoading = false;
      }
    );
  }


  loadJornadas() {
    this.jornadaService.getJornadas().subscribe(
      (jornadas: Jornada[]) => {
        this.jornadas = jornadas;
        this.isLoading = false;
        this.populateFormWithJornadaData();
      },
      error => {
        console.error('Error al cargar las jornadas:', error);
        this.isLoading = false;
      }
    );
  }

  loadPeriodos() {
    this.periodoService.getPeriodo().subscribe(
      (periodos: Periodos[]) => {
        this.periodos = periodos;
        this.isLoading = false;
        this.populateFormWithJornadaData();
      },
      error => {
        console.error('Error al cargar los periodos:', error);
        this.isLoading = false;
      }
    );
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


loadActividadNODoc() {
  this.actNODocService.get().subscribe(
    (actividadNOD: ActividadesNoDocente[]) => {
      this.actcNODocentes = actividadNOD;
      this.isLoading = false;
      this.populateFormWithJornadaData();
    },
    error => {
      console.error('Error al cargar los Actividades NO Docente:', error);
      this.isLoading = false;
    }
  );
}



loadActividadDoc() {
  this.actDocService.getAct().subscribe(
    (actividadD: ActividadesDocente[]) => {
      this.actcDocentes = actividadD;
      this.isLoading = false;
      this.populateFormWithJornadaData();
    },
    error => {
      console.error('Error al cargar los Actividades Docente:', error);
      this.isLoading = false;
    }
  );
}

loadAsignaturas() {
  this.asignaturaService.get().subscribe(
    (asignaturas: Asignatura[]) => {
      this.asignaturas = asignaturas;
      this.isLoading = false;
      this.populateFormWithJornadaData();
    },
    error => {
      console.error('Error al cargar los asignaturas:', error);
      this.isLoading = false;
    }
  );
}


createForm() {
  this.updateForm = this.fb.group({
    carrera_id: ['', Validators.required],
    jornada_id: ['', Validators.required],
    curso_id: ['', Validators.required],

    periodo_id: ['', Validators.required],
    asignatura_id: ['', Validators.required],
    actividoc_id: ['', Validators.required],
    activinodoc_id: ['', Validators.required],
    docente_id: ['', Validators.required],
  });
}

  

populateFormWithJornadaData() {
  if (this.distributivo && this.carreras.length > 0 && this.jornadas.length > 0 && this.cursos.length > 0 && this.periodos.length > 0 && this.asignaturas.length > 0 && this.actcDocentes.length > 0 && this.actcNODocentes.length > 0 && this.docentes.length > 0 ) {
    const selectedCarrera = this.carreras.find(carrera => carrera.carrera_id === this.distributivo?.modeloCarrera.carrera_id);
    const selectedJornada = this.jornadas.find(jornada => jornada.jornada_id === this.distributivo?.modeloJordana.jornada_id);
    const selectedCurso = this.cursos.find(curso => curso.curso_id === this.distributivo?.modeloCurso.curso_id);
    const selectedPeriodo = this.periodos.find(periodo => periodo.periodo_id === this.distributivo?.modeloPeriodos.periodo_id);
    const selectedAsignatura = this.asignaturas.find(asignatura => asignatura.asignatura_id === this.distributivo?.modeloAsignaturas.asignatura_id);
    const selectedActDocente = this.actcDocentes.find(actividaDoc => actividaDoc.actividoc_id === this.distributivo?.modeloActividadesDocentes.actividoc_id);
    const selectedActNODocente = this.actcNODocentes.find(actividaNODoc => actividaNODoc.activinodoc_id === this.distributivo?.modeloActividadesNoDocentes.activinodoc_id);
    const selectedDocente = this.docentes.find(docente => docente.docente_id === this.distributivo?.modeloDocente.docente_id);

    this.updateForm.patchValue({
      
      carrera_id: selectedCarrera ? selectedCarrera.carrera_id : null,
      jornada_id: selectedJornada ? selectedJornada.jornada_id : null, 
      curso_id: selectedCurso ? selectedCurso.curso_id : null,
      periodo_id: selectedPeriodo ? selectedPeriodo.periodo_id : null,
      asignatura_id: selectedAsignatura ? selectedAsignatura.asignatura_id : null,
      actividoc_id: selectedActDocente ? selectedActDocente.actividoc_id : null,
      activinodoc_id: selectedActNODocente ? selectedActNODocente.activinodoc_id : null,
      docente_id: selectedDocente ? selectedDocente.docente_id : null,
    });

    console.log('Datos que se van a actualizar:', {
      carrera_id: selectedCarrera ? selectedCarrera.carrera_id : null,
      jornada_id: selectedJornada ? selectedJornada.jornada_id : null,
      curso_id: selectedCurso ? selectedCurso.curso_id : null,
      periodo_id: selectedPeriodo ? selectedPeriodo.periodo_id : null,
      asignatura_id: selectedAsignatura ? selectedAsignatura.asignatura_id : null,
      actividoc_id: selectedActDocente ? selectedActDocente.actividoc_id : null,
      activinodoc_id: selectedActNODocente ? selectedActNODocente.activinodoc_id : null,
      docente_id: selectedDocente ? selectedDocente.docente_id : null,
    });
  }
}


oncarreraSelected(event: any) {
  const selectedCarreraId = event.target.value;
  console.log('ID de carrera seleccionada:', selectedCarreraId);
  this.carrera_idreceptor = selectedCarreraId;
}

onjornadaSelected(event: any) {
  const selectedJornadaID = event.target.value;
  console.log('ID de jornada seleccionada:', selectedJornadaID);
  this.jornada_idreceptor = selectedJornadaID;
}

oncursoSelected(event: any) {
  const selectedCursoId = event.target.value;
  console.log('ID de curso seleccionada:', selectedCursoId);
  this.curso_idreceptor = selectedCursoId;
}

onperiodoSelected(event: any) {
  const selectedPeriodoId = event.target.value;
  console.log('ID de periodo seleccionada:', selectedPeriodoId);
  this.periodo_idreceptor = selectedPeriodoId;
}

onasignaturaSelected(event: any) {
  const selectedAsignaturaId = event.target.value;
  console.log('ID de asignatura seleccionada:', selectedAsignaturaId);
  this.asignatura_idreceptor = selectedAsignaturaId;
}


onactividadDocSelected(event: any) {
  const selectedActDocenteId = event.target.value;
  console.log('ID de ACTIVIDAD DOCENTE seleccionada:', selectedActDocenteId);
  this.actDoc_idreceptor = selectedActDocenteId;
}

onactividadNODocSelected(event: any) {
  const selectedActNODocenteId = event.target.value;
  console.log('ID de ACTIVIDAD NO DOCENTE seleccionada:', selectedActNODocenteId);
  this.actNODoc_idreceptor = selectedActNODocenteId;
}


ondocenteSelected(event: any) {
  const selectedDocenteId = event.target.value;
  console.log('ID de docente seleccionada:', selectedDocenteId);
  this.docente_idreceptor = selectedDocenteId;
}



  
onSubmit() {
  if (this.updateForm && this.updateForm.valid) {
    const updatedDis = this.updateForm.value;
    updatedDis.distributivo_id = this.distributivo?.distributivo_id || 0;

    this.carrera_idreceptor = updatedDis.carrera_id;
    this.jornada_idreceptor = updatedDis.jornada_id;
    this.curso_idreceptor = updatedDis.curso_id;
    this.periodo_idreceptor = updatedDis.periodo_id;
     this.asignatura_idreceptor= updatedDis.asignatura_id;

    this.actDoc_idreceptor= updatedDis.actividoc_id;
    this.actNODoc_idreceptor= updatedDis.activinodoc_id;

    this.docente_idreceptor = updatedDis.docente_id;


    if (!updatedDis.distributivo_id) {
      console.error('Error: ID distributivo no válido');
      return;
    }

    console.log('Se enviará carrera_idreceptor:', this.carrera_idreceptor);
    console.log('Se enviará jornada_idreceptor:', this.jornada_idreceptor);
    console.log('Se enviará periodo_idreceptor:', this.periodo_idreceptor);
    console.log('Se enviará curso_idreceptor:', this.curso_idreceptor);


    console.log('Se enviará asignatura_idreceptor:', this.asignatura_idreceptor);
    console.log('Se enviará actDoc_idreceptor:', this.actDoc_idreceptor);
    console.log('Se enviará actNODoc_idreceptor:', this.actNODoc_idreceptor);
    
    console.log('Se enviará docente_idreceptor:', this.docente_idreceptor);

    
    this.distibutivo2.distributivo_id=this.distributivo_idreceptor;

    this.distibutivo2.modeloCarrera.carrera_id  =  this.carrera_idreceptor;
    this.distibutivo2.modeloJordana.jornada_id=this.jornada_idreceptor;
    this.distibutivo2.modeloCurso.curso_id  =  this.curso_idreceptor;
    this.distibutivo2.modeloPeriodos.periodo_id=this.periodo_idreceptor;
    this.distibutivo2.modeloAsignaturas.asignatura_id=this.asignatura_idreceptor;

    this.distibutivo2.modeloActividadesDocentes.actividoc_id=this.actDoc_idreceptor;
    this.distibutivo2.modeloActividadesNoDocentes.activinodoc_id=this.actNODoc_idreceptor;
    this.distibutivo2.modeloDocente.docente_id=this.docente_idreceptor;

    console.log( this.distibutivo2);
    this.distributivoService.updateDistributivo(this.distibutivo2).subscribe(
      (updatedDis: Distributivo) => {
        console.log('Distributivo actualizado con éxito:', updatedDis);
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

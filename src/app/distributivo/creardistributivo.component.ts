import { Component, Input, OnInit } from '@angular/core';
import { CarreraService } from '../carrera/carrera.service';
import { JornadaService } from '../jornada/jornada.service';
import { Docente } from '../docente/docente';
import { Carrera } from '../carrera/carrera';
import { Jornada } from '../jornada/jornada';
import { Curso } from '../listar-curso/curso';
import { Periodos } from '../periodos/periodo';
import { Asignatura } from '../asignatura/asignatura';
import { ActividadesDocente } from '../actividades-docente/actividades-docente';
import { ActividadesNoDocente } from '../actividades-no-docente/actividades-no-docente';
import { DocenteService } from '../docente/docente.service';
import { AsignaturaService } from '../asignatura/asignatura.service';
import { ActividadesDocenteService } from '../actividades-docente/actividades-docente.service';
import { ActividadNoDocenteService } from '../actividades-no-docente/actividad-no-docente.service';
import { Distributivo } from './Distributivo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { DistributivoService } from './distributivo.service';
import { CursoService } from '../listar-curso/curso.service';
import { PeriodoService } from '../periodos/periodo.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-creardistributivo',
  templateUrl: './creardistributivo.component.html',
  styleUrls: ['./creardistributivo.component.css'],
})
export class CreardistributivoComponent implements OnInit {
  @Input() distributivo: Distributivo | undefined;
  distributivo_id: number | undefined;
  updateForm!: FormGroup;


  distributivo1: Distributivo[] = [];
  nuevaDistributivo: Distributivo = new Distributivo();


  docente1: Docente[] = [];
  createdocente: Docente = new Docente();
  public  nombreDocSeleecionada: string = '';


  carrera1: Carrera[] = []; // Arreglo para almacenar las carreras
  createcarrera: Carrera = new Carrera();
  public  nombreCarreraSelecionada: string = '';


  jornada1: Jornada[] = []; // Arreglo para almacenar las jornadas
  createjornada: Jornada = new Jornada();
  public  nombreJornadaSeleecionada: string = '';


  curso1: Curso[] = [];
  createcurso: Curso= new Curso();
  public  nombreCursoSelecionada: string = '';
  

  periodo1: Periodos[] = [];
  createperiodo: Periodos = new Periodos();
  public  nombrePeriodoSelecionada: string = '';


  asignatura1: Asignatura[] = [];
  createasignatura: Asignatura = new Asignatura();
  public  nombreAsigSelecionada: string = '';


  actividaddocente1: ActividadesDocente[] = [];
  createAcDoc: ActividadesDocente = new ActividadesDocente();
  public  nombreActDocSelecionada: string = '';


  actividadnodocente1: ActividadesNoDocente[] = [];
  createAcNODoc: ActividadesNoDocente = new ActividadesNoDocente();
  public  nombreActNODocSelecionada: string = '';

  isLoading: boolean = true;
  botonDesactivado: boolean = false;


  constructor(
    private distributivoService: DistributivoService,
    private router: Router,
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private carreraService: CarreraService,
    private jornadaService: JornadaService,
    private cursoService: CursoService,
    private periodoService: PeriodoService,
    private asignaturaservice: AsignaturaService,
    private actividadesDocenteService: ActividadesDocenteService,
    private ActividadNoDocenteService: ActividadNoDocenteService,
    private docenteService: DocenteService,
    

  ) {

    this.createForm();

  }

  ngOnInit(): void {
    this.cargarCarrera();
    this.cargarListaCarr();


    this.cargarJornada();
    this.cargarListaJor();


    this.cargarCurso();
    this.cargarListaCur();


    this.cargarPeriodo();
    this.cargarListaPer();
    

    this.cargarAsignatura();
    this.cargarListaAsig();



    this.cargarActDocente();
    this.cargarListaADocente();

    this.cargarActNODocente();
    this.cargarListaANODocente();

    this.cargarDocente();
    this.cargarListadoc();

  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>('http://localhost:8080/carrera');
  }

  cargarCarrera() {
    this.getCarreras().subscribe((carreras) => (this.carrera1 = carreras));
  }

  getJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>('http://localhost:8080/jornadas');
  }

  cargarJornada() {
    this.getJornadas().subscribe((jornadas) => (this.jornada1 = jornadas));
  }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>('http://localhost:8080/curso');
  }

  cargarCurso() {
    this.getCursos().subscribe((cursos) => (this.curso1 = cursos));
  }


//PERIODOS
getPeriodos(): Observable<Periodos[]> {
  return this.http.get<Periodos[]>('http://localhost:8080/periodos');
}

cargarPeriodo() {
  this.getPeriodos().subscribe((periodos) => (this.periodo1 = periodos));
}



  getAsignatura(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>('http://localhost:8080/asignatura');
  }

  cargarAsignatura() {
    this.getAsignatura().subscribe((asignaturas) => (this.asignatura1 = asignaturas));
  }



  getAcNDocsignatura(): Observable<ActividadesNoDocente[]> {
    return this.http.get<ActividadesNoDocente[]>('http://localhost:8080/actividades-no-docentes');
  }

  cargarActNODocente() {
    this.getAcNDocsignatura().subscribe((actividadNOdocentes) => (this.actividadnodocente1 = actividadNOdocentes));
  }



  getAcDoc(): Observable<ActividadesDocente[]> {
    return this.http.get<ActividadesDocente[]>('http://localhost:8080/actividadesdocentes');
  }

  cargarActDocente() {
    this.getAcDoc().subscribe((actividaddocentes) => (this.actividaddocente1 = actividaddocentes));
  }


  getDocente(): Observable<Docente[]> {
    return this.http.get<Docente[]>('http://localhost:8080/docente');
  }

  cargarDocente() {
    this.getDocente().subscribe((docentes) => (this.docente1 = docentes));
  }


  createForm() {
    this.updateForm = this.fb.group({
      distributivo_id:['', Validators.required],
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


  cargarListaCarr(): void {
    this.distributivoService.getcarrss().subscribe(
      carreras => {
        this.carrera1 = carreras;
        this.isLoading = false;
        console.log('Carrera cargados exitosamente:', carreras);
      },
      error => {
        console.error('Error al cargar carrera:', error);
        this.isLoading = false;
      }
    );
  }


  cargarListaJor(): void {
    this.distributivoService.getjorss().subscribe(
      jornadas => {
        this.jornada1 = jornadas;
        this.isLoading = false;
        console.log('Jornada cargados exitosamente:', jornadas);
      },
      error => {
        console.error('Error al cargar la jornada:', error);
        this.isLoading = false;
      }
    );
  }


  cargarListaCur(): void {
    this.distributivoService.getcurss().subscribe(
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



  cargarListaPer(): void {
    this.distributivoService.getperidss().subscribe(
      periodos => {
        this.periodo1 = periodos;
        this.isLoading = false;
        console.log('Periodos cargados exitosamente:', periodos);
      },
      error => {
        console.error('Error al cargar los periodos:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListaANODocente(): void {
    this.distributivoService.getactDoccss().subscribe(
      actividadesD => {
        this.actividaddocente1 = actividadesD;
        this.isLoading = false;
        console.log('asignaturas cargados exitosamente:', actividadesD);
      },
      error => {
        console.error('Error al cargar los asignaturas:', error);
        this.isLoading = false;
      }
    );
  }


  cargarListaADocente(): void {
    this.distributivoService.getactNoDocsss().subscribe(
      actividadesN => {
        this.actividadnodocente1 = actividadesN;
        this.isLoading = false;
        console.log('asignaturas cargados exitosamente:', actividadesN);
      },
      error => {
        console.error('Error al cargar los asignaturas:', error);
        this.isLoading = false;
      }
    );
  }


  cargarListaAsig(): void {
    this.distributivoService.getasigg().subscribe(
      asignaturas => {
        this.asignatura1 = asignaturas;
        this.isLoading = false;
        console.log('asignaturas cargados exitosamente:', asignaturas);
      },
      error => {
        console.error('Error al cargar los asignaturas:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListadoc(): void {
    this.distributivoService.getdoccente().subscribe(
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



//ONNS



onCarreraSelected(event: any) {
  this.nombreCarreraSelecionada = event.target.value;
  const nombre = this.nombreCarreraSelecionada;
  this.carreraService.getCarreraByName(nombre).subscribe(
    (carrera: Carrera | undefined) => {
      if (carrera) {
        
      
        this.createcarrera=carrera;
        console.log('Carrera encontrados:',  this.createcarrera);

      } else {
        console.log('Carrera no encontrado');
      }
    },
    (error) => {
      console.error('Error al obtener la carrera:', error);
    }
  );
}


onJornadaSelected(event: any) {
  this.nombreJornadaSeleecionada = event.target.value;
  const nombre = this.nombreJornadaSeleecionada;
  this.jornadaService.getJornadaByName(nombre).subscribe(
    (jornada: Jornada | undefined) => {
      if (jornada) {
        
      
        this.createjornada=jornada;
        console.log('Jornada encontrado:',  this.createjornada);

      } else {
        console.log('Jornada no encontrado');
      }
    },
    (error) => {
      console.error('Error al obtener la jornada:', error);
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



onPeriodoSelected(event: any) {
  this.nombrePeriodoSelecionada = event.target.value;
  const nombre = this.nombrePeriodoSelecionada;
  this.periodoService.getperiodoByName(nombre).subscribe(
    (periodo: Periodos | undefined) => {
      if (periodo) {
        
      
        this.createperiodo=periodo;
        console.log('Periodo encontrado:',  this.createperiodo);

      } else {
        console.log('Periodo no encontrado');
      }
    },
    (error) => {
      console.error('Error al obtener los periodos:', error);
    }
  );
}



onAsignaturaSelected(event: any) {
  this.nombreAsigSelecionada = event.target.value;
  const nombre = this.nombreAsigSelecionada;
  this.asignaturaservice.getAsignaturaByName(nombre).subscribe(
    (asignatura: Asignatura | undefined) => {
      if (asignatura) {
        
      
        this.createasignatura=asignatura;
        console.log('asignatura encontrado:',  this.createasignatura);

      } else {
        console.log('asignatura no encontrado');
      }
    },
    (error) => {
      console.error('Error al obtener los asignatura:', error);
    }
  );
}


onActvDocSelected(event: any) {
  this.nombreActDocSelecionada = event.target.value;
  const nombre = this.nombreActDocSelecionada;
  this.actividadesDocenteService.getActDicentesByName(nombre).subscribe(
    (actividadesDoc: ActividadesDocente | undefined) => {
      if (actividadesDoc) {
        
      
        this.createAcDoc=actividadesDoc;
        console.log('Act Docente encontrado:',  this.createAcDoc);

      } else {
        console.log('Act Docente no encontrado');
      }
    },
    (error) => {
      console.error('Error al obtener el Act Docente:', error);
    }
  );
}


onActvNODocSelected(event: any) {
  this.nombreActNODocSelecionada = event.target.value;
  const nombre = this.nombreActNODocSelecionada;
  this.ActividadNoDocenteService.getActNoDocenteByName(nombre).subscribe(
    (actividadesNODoc: ActividadesNoDocente | undefined) => {
      if (actividadesNODoc) {
        
      
        this.createAcNODoc=actividadesNODoc;
        console.log('Act NO Docente encontrado:',  this.createAcNODoc);

      } else {
        console.log('Act NO Docente no encontrado');
      }
    },
    (error) => {
      console.error('Error al obtener el Act NO Docente:', error);
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

crearDistributivo() {
  this.nuevaDistributivo.modeloCarrera = this.createcarrera;
  this.nuevaDistributivo.modeloJordana = this.createjornada;
  this.nuevaDistributivo.modeloDocente = this.createdocente;

  this.nuevaDistributivo.modeloCurso = this.createcurso;
  this.nuevaDistributivo.modeloPeriodos = this.createperiodo;
  this.nuevaDistributivo.modeloAsignaturas = this.createasignatura;
  this.nuevaDistributivo.modeloActividadesDocentes = this.createAcDoc;
  this.nuevaDistributivo.modeloActividadesNoDocentes = this.createAcNODoc;

  this.distributivoService.create(this.nuevaDistributivo).subscribe(
    (response) => {

      console.log('distributivo creado exitosamente:', response);
      this.router.navigate(['/distributivo']);
      
    },
    (error) => {
      console.error('Error al crear la distributivo:', error);
    }
  );
}


cancelar(): void {
  this.router.navigate(['/distributivo']);
}




}

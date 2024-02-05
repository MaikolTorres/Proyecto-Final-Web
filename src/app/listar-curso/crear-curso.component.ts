import { Component, Input, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jornada } from '../jornada/jornada';
import { Carrera } from '../carrera/carrera';
import { Periodos } from '../periodos/periodo';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JornadaService } from '../jornada/jornada.service';
import { PeriodoService } from '../periodos/periodo.service';
import { CarreraService } from '../carrera/carrera.service';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  @Input() curso: Curso | undefined;
  curso_id: number | undefined;
  updateForm!: FormGroup;
  
  curso1: Curso[] = [];
  nuevaCurso: Curso = new Curso();


//PARA LAS CLASES QUE SON LLAMADAS
  periodo1: Periodos[] = [];
  createperiodo: Periodos= new Periodos();
  public  nombrePeriodoSelecionada: string = '';
  

  carrera1: Carrera[] = [];
  createcarrera: Carrera= new Carrera();
  public  nombreCarreraSeleecionada: string = '';

  jornada1: Jornada[] = [];
  createjornada: Jornada= new Jornada();
  public  nombreJornadaSeleecionada: string = '';


  isLoading: boolean = true;
  botonDesactivado: boolean = false;

  curso_nombre: string = '';
  curso_paralelo: string = '';




  constructor(private cursoService: CursoService, private router: Router,
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,

    private periodoService: PeriodoService,
    private carreraService: CarreraService,
    private jornadaService: JornadaService

  ) {
    this.createForm();

  }

  ngOnInit() {
    this.createForm();

    this.cargarCarrera();
    this.cargarListaCarr();

    this.cargarPeriodo();
    this.cargarListaPer();

    this.cargarJornada();
    this.cargarListaJor();

  }
  initializeForm() {
    this.createForm();
  }



  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>('http://localhost:8080/carrera');
  }

  cargarCarrera() {
    this.getCarreras().subscribe((carreras) => (this.carrera1 = carreras));
  }

//PERIODOS
  getPeriodos(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>('http://localhost:8080/periodos');
  }

  cargarPeriodo() {
    this.getPeriodos().subscribe((periodos) => (this.periodo1 = periodos));
  }

//JORNADAS
  getJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>('http://localhost:8080/jornadas');
  }

  cargarJornada() {
    this.getJornadas().subscribe((jornadas) => (this.jornada1 = jornadas));
  }


  createForm() {
    this.updateForm = this.fb.group({
      curso_nombre: ['', Validators.required],
      curso_paralelo: ['', Validators.required],

      carrera_id: ['', Validators.required],
      periodo_id: ['', Validators.required],
      jornada_id: ['', Validators.required],
    });
  }



  cargarListaCarr(): void {
    this.cursoService.getcarrer().subscribe(
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


  cargarListaPer(): void {
    this.cursoService.getperiodd().subscribe(
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



  cargarListaJor(): void {
    this.cursoService.getjornss().subscribe(
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

  onCarreraSelected(event: any) {
    this.nombreCarreraSeleecionada = event.target.value;
    const nombre = this.nombreCarreraSeleecionada;
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



  crearCursos() {
    this.nuevaCurso.modeloCarrera = this.createcarrera;
    this.nuevaCurso.periodo = this.createperiodo;
    this.nuevaCurso.modeloJornada = this.createjornada;


    this.nuevaCurso.curso_nombre = this.curso_nombre;
    this.nuevaCurso.curso_paralelo = this.curso_paralelo;
    this.cursoService.create(this.nuevaCurso).subscribe(
      (response) => {

        console.log('Curso creado exitosamente:', response);
        this.router.navigate(['/listarcurso']);
        
      },
      (error) => {
        console.error('Error al crear el curso:', error);
      }
    );
  }

  
  cancelar(): void {
    this.router.navigate(['/listarcurso']);
  }




}

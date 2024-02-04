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

  periodo1: Periodos[] = [];
  public createperiodo: Periodos = new Periodos();

  carrera1: Carrera[] = [];
  public createcarrera: Carrera = new Carrera();


  public jornada1: Jornada[] = [];
  public createjornada: Jornada = new Jornada();


  isLoading: boolean = true;

  botonDesactivado: boolean = false;

  curso_nombre: string = '';
  curso_paralelo: string = '';
  nuevoCurso: Curso = new Curso();
  public ckeckjornada: string = '';
  public ckeckperiodo: string = '';
  public ckeckcarrera: string = '';

  public jornadaSeleccionada: string = '';


  constructor(private cursoService: CursoService, private router: Router,
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private jornadaService: JornadaService,
    private periodoService: PeriodoService,
    private carreraService: CarreraService

  ) {
    this.createForm();

  }

  ngOnInit() {
    this.createForm();
    this.cargarCarreras();
    this.cargarListaCa();

    this.cargarPeriodos();
    this.cargarListaPer();

    this.cargarJornada();
    this.cargarListaJor();
  }

  createForm() {
    this.updateForm = this.fb.group({
      curso_nombre: ['', Validators.required],
      curso_paralelo: ['', Validators.required],
      carrera_id: ['', Validators.required],
      jornada_id: ['', Validators.required],
      periodo_id: ['', Validators.required],
    });
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>('http://localhost:8080/carrera');
  }

  cargarCarreras() {
    this.getCarreras().subscribe((carreras) => (this.carrera1 = carreras));
  }

  getPeriodos(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>('http://localhost:8080/periodos');
  }

  cargarPeriodos() {
    this.getPeriodos().subscribe((periodos) => (this.periodo1 = periodos));
  }

  getCJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>('http://localhost:8080/jornadas');
  }

  cargarJornada() {
    this.getCJornadas().subscribe((jornadas) => (this.jornada1 = jornadas));
  }

  loadGradoDetails() {
    if (this.curso && this.curso.curso_id) {
      this.curso_id = this.curso.curso_id;
      this.cursoService.getcursoId(this.curso_id).subscribe(
        (curso: Curso) => {
          this.updateForm.patchValue({
            curso_nombre: curso.curso_nombre,
            curso_paralelo: curso.curso_paralelo,
            carrera_id: curso.modeloCarrera.carrera_id,
            jornada_id: curso.modeloJornada.jornada_id,
            periodo_id: curso.periodo.periodo_id,
          });
        },
        (error) => {
          console.error('Error al cargar detalles del curso:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedCurso = this.updateForm.value;
      updatedCurso.curso_id = this.curso?.curso_id || 0;

      if (!updatedCurso.curso_id) {
        console.error('Error: ID de curso no válido');
        return;
      }

      this.cursoService.updateCurso(updatedCurso).subscribe(
        (data) => {
          console.log('Curso actualizada con éxito:', data);
          this.modalRef.hide();
        },
        (error) => {
          console.error('Error al actualizar el curso:', error);

          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn(
              'El servidor respondió con un estado 200 pero el contenido no es JSON válido.'
            );
          }
        }
      );
    }
  }

  cargarListaCa(): void {
    this.cursoService.getcarrer().subscribe(
      carreras => {
        this.carrera1 = carreras;
        this.isLoading = false;
        console.log('Carreras cargadas exitosamente:', carreras);
      },
      error => {
        console.error('Error al cargar las carreras:', error);
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
        console.log('Jornadas cargadas exitosamente:', jornadas);
      },
      error => {
        console.error('Error al cargar las jornadas:', error);
        this.isLoading = false;
      }
    );
  }

  onJornadaSelected(event: any) {
    this.ckeckjornada = event.target.value;
    const name = this.ckeckjornada;

    this.jornadaService.comboidjornada(name).subscribe(
      (jornadaExists: boolean) => {
        if (jornadaExists) {
          console.log(`La jornada ${name} existe.`);
          this.jornadaService.getJornadaById(name).subscribe(
            (jornada: Jornada | undefined) => {
              if (jornada) {
                // Hacer algo con el rol encontrado
              
                this.createjornada=jornada;
                console.log('Jornada encontrado:', this.jornada1);

              } else {
                console.log('Jornada no encontrada');
              }
            },
            (error) => {
              console.error('Error al obtener la jornada:', error);
            }
          );
           
        } else {
          console.log(`La jornada ${name} no existe.`);
       
        }
      },
      (error) => {
        console.error('Error al verificar la jornada:', error);
      }
    );
  }


  onPeriodoSelected(event: any) {
    this.ckeckperiodo = event.target.value;
    const names = this.ckeckperiodo;

    this.periodoService.comboidperiodo(names).subscribe(
      (periodoExists: boolean) => {
        if (periodoExists) {
          console.log(`El periodo ${name} existe.`);
          this.periodoService.getjjById(name).subscribe(
            (periodo: Periodos | undefined) => {
              if (periodo) {
              
                this.createperiodo=periodo;
                console.log('Periodo encontrado:', this.periodo1);

              } else {
                console.log('Periodo no encontrado');
              }
            },
            (error) => {
              console.error('Error al obtener el Periodo:', error);
            }
          );
           
        } else {
          console.log(`El Periodo ${name} no existe.`);
       
        }
      },
      (error) => {
        console.error('Error al verificar el periodo:', error);
      }
    );
  }


  onCarreraSelected(event: any) {
    this.ckeckcarrera = event.target.value;
    const name = this.ckeckcarrera;

    this.carreraService.comboidcarrera(name).subscribe(
      (carreraExists: boolean) => {
        if (carreraExists) {
          console.log(`La carrea ${name} existe.`);
          this.carreraService.getCcById(name).subscribe(
            (carrera: Carrera | undefined) => {
              if (carrera) {
              
                this.createcarrera=carrera;
                console.log('Carrera encontrado:', this.carrera1);

              } else {
                // Manejar el caso en que no se encuentra el rol
                console.log('carrera no encontrado');
              }
            },
            (error) => {
              // Manejar errores de la solicitud HTTP
              console.error('Error al obtener la carrera:', error);
            }
          );
           
        } else {
          console.log(`La carrera ${name} no existe.`);
       
        }
      },
      (error) => {
        console.error('Error al verificar la carrera:', error);
      }
    );
  }



  crearCurso() {

    this.nuevoCurso.modeloJornada = this.createjornada;
    this.nuevoCurso.periodo = this.createperiodo;
    this.nuevoCurso.modeloCarrera = this.createcarrera;
    this.nuevoCurso.curso_nombre = this.curso_nombre;
    this.nuevoCurso.curso_paralelo = this.curso_paralelo;
    this.cursoService.create(this.nuevoCurso).subscribe(
      (response) => {
       
        console.log('Curso creado exitosamente:', response);

        window.close();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al crear el curso:', error);
      }
    );
  }


  cancelar(): void {
    this.router.navigate(['/listarcurso']);
  }




}

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

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent  implements OnInit {
  @Input() curso: Curso | undefined;
  curso_id: number | undefined;
  updateForm!: FormGroup;
  curso1: Curso[] = [];

  periodo: Periodos[] = [];
  periodo1: Periodos[] = [];
  
  carrera: Carrera[] = [];
  carrera1: Carrera[] = [];

  jornada: Jornada[] = [];
  jornada1: Jornada[] = [];

  isLoading: boolean = true;

  botonDesactivado: boolean = false;

  constructor(private cursoService: CursoService, private router: Router,
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private http: HttpClient 
    ) { }


  ngOnInit() {
    this.createForm();
    this.cargarCarreras();
    this.cargarListaCa();

    this.cargarPeriodos();
    this.cargarListaPer();

    this.cargarJornada();
    this.cargarListaJor();

    this.loadGradoDetails();
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
    this.getCarreras().subscribe((carreras) => (this.carrera = carreras));
  }

  getPeriodos(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>('http://localhost:8080/periodos');
  }

  cargarPeriodos() {
    this.getPeriodos().subscribe((periodos) => (this.periodo = periodos));
  }

  getCJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>('http://localhost:8080/jornadas');
  }

  cargarJornada() {
    this.getCJornadas().subscribe((jornadas) => (this.jornada = jornadas));
  }

  loadGradoDetails() {
    if (this.curso && this.curso.curso_id) {
      this.curso_id = this.curso.curso_id;
      this.cursoService.getcursoId(this.curso_id).subscribe(
        (curso: Curso) => {
          this.updateForm.patchValue({
            curso_nombre: curso.curso_nombre,
            curso_paralelo: curso.curso_paralelo,
            carrera_id: curso.carrera.carrera_id,
            jornada_id: curso.jornada.jornada_id,
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
      (carreras) => {
        this.carrera1 = carreras;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las carreras:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListaPer(): void {
    this.cursoService.getperiodd().subscribe(
      (periodos) => {
        this.periodo1 = periodos;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los periodos:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListaJor(): void {
    this.cursoService.getjornss().subscribe(
      (jornadas) => {
        this.jornada1 = jornadas;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar las jornadas:', error);
        this.isLoading = false;
      }
    );
  }



  
  crearCurso() {
    this.botonDesactivado = true;
    
    

    const jornadaIdSeleccionada = this.updateForm.get('jornada_id')?.value;
    const carreraIdSeleccionada = this.updateForm.get('carrera_id')?.value;
    const periodoIdSeleccionado = this.updateForm.get('periodo_id')?.value;
  
    if (!jornadaIdSeleccionada || !carreraIdSeleccionada || !periodoIdSeleccionado) {
      console.error('Error: Datos de jornada, carrera o periodo no válidos');
      console.error('josr' , this.updateForm.get('jornada_id')?.value)
      this.botonDesactivado = false;
      return;
    }
  
    const nuevo: Curso = new Curso(
      -1,
      this.updateForm.get('curso_nombre')?.value,
      this.updateForm.get('curso_paralelo')?.value,
      jornadaIdSeleccionada,
      carreraIdSeleccionada,
      periodoIdSeleccionado
    );
    console.log(nuevo);
          
    console.error(nuevo);

  
    this.cursoService.create(nuevo).subscribe(
      (response) => {
        console.log('Curso creado exitosamente:', response);
        alert('Curso creado exitosamente');
        window.close();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al crear curso:', error);
        console.error('josr' , this.updateForm.get('jornada_id')?.value + 1)
        console.error(nuevo);


        if (error.status === 401) {
          this['router'].navigate(['/login']);
        } else if (error.error && error.error.error) {
          console.error('Error específico del servidor:', error.error.error);
          alert('Error específico del servidor: ' + error.error.error);
        } else {
          // Muestra un mensaje de error genérico al usuario
          console.error('Error genérico al crear. Por favor, inténtelo de nuevo.', error);
          console.error('josr' , this.updateForm.get('jornada_id')?.value)

          alert('Error genérico al crear. Por favor, inténtelo de nuevo.');
        }
  
        // Reactivar el botón después de un error
        this.botonDesactivado = false;
      }
    );
  }
  

  cancelar(): void {
    this.router.navigate(['/listarcurso']);
  }




}

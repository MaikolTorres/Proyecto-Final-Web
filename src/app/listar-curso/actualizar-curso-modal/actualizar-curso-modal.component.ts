import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Curso } from '../curso';
import { CursoService } from '../curso.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Periodos } from 'src/app/periodos/periodo';
import { Carrera } from 'src/app/carrera/carrera';
import { Jornada } from 'src/app/jornada/jornada';
import { Observable } from 'rxjs';
import { CarreraService } from 'src/app/carrera/carrera.service';
import { Router } from '@angular/router';
import { JornadaService } from 'src/app/jornada/jornada.service';
import { PeriodoService } from 'src/app/periodos/periodo.service';

@Component({
  selector: 'app-actualizar-curso-modal',
  templateUrl: './actualizar-curso-modal.component.html',
  styleUrls: ['./actualizar-curso-modal.component.css']
})
export class ActualizarCursoModalComponent implements OnInit {
  @Input() curso: Curso | undefined;
  curso_id: number | undefined;
  updateForm!: FormGroup;
  curso2: Curso = new Curso();

  jornadas: Jornada[] = [];
  jornada2: Jornada[] = [];
  
  
  carreras: Carrera[] = [];
  carrera2: Carrera[] = [];
  
  periodos: Periodos[] = [];
  periodo2: Periodos[] = [];

  isLoading: boolean = true;


  public curso_idreceptor : number= 0;
  public carrera_idreceptor : number= 0;
  public jornada_idreceptor : number= 0;
  public periodo_idreceptor : number= 0;

  public curso_nombre_receptor : string= '';
  public curso_paralelo_receptor  : string= '';

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private cursoService: CursoService,
    private http: HttpClient,
    private router: Router,
    private carreraService: CarreraService,
    private jornadaService: JornadaService,
    private periodoService: PeriodoService


  ) {
    ///primero se debe inicializar antes de asignarles los valores
    this.curso2.modeloCarrera = new Carrera();
    this.curso2.modeloJornada = new Jornada();
    this.curso2.periodo = new Periodos();

  }

  ngOnInit() {
    this.loadCarreras();
    this.loadJornadas();
    this.loadPeriodos();

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

createForm() {
  this.updateForm = this.fb.group({
    curso_nombre: ['', Validators.required],
    curso_paralelo: ['', Validators.required],
    carrera_id: ['', Validators.required],
    jornada_id: ['', Validators.required],
    periodo_id: ['', Validators.required],

  });
}
  

populateFormWithJornadaData() {
  if (this.curso && this.carreras.length > 0 && this.jornadas.length > 0 && this.periodos.length > 0) {
    const selectedCarrera = this.carreras.find(carrera => carrera.carrera_id === this.curso?.modeloCarrera.carrera_id);
    const selectedJornada = this.jornadas.find(jornada => jornada.jornada_id === this.curso?.modeloJornada.jornada_id);
    const selectedPeriodo = this.periodos.find(periodo => periodo.periodo_id === this.curso?.periodo.periodo_id);


    this.updateForm.patchValue({
      curso_nombre: this.curso.curso_nombre,
      curso_paralelo: this.curso.curso_paralelo,
      carrera_id: selectedCarrera ? selectedCarrera.carrera_id : null,
      jornada_id: selectedJornada ? selectedJornada.jornada_id : null, 
      periodo_id: selectedPeriodo ? selectedPeriodo.periodo_id : null,
    });

    console.log('Datos que se van a actualizar:', {
      curso_nombre: this.curso.curso_nombre,
      curso_paralelo: this.curso.curso_paralelo,
      carrera_id: selectedCarrera ? selectedCarrera.carrera_id : null,
      jornada_id: selectedJornada ? selectedJornada.jornada_id : null,
      periodo_id: selectedPeriodo ? selectedPeriodo.periodo_id : null,

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

onperiodoSelected(event: any) {
  const selectedPeriodoId = event.target.value;
  console.log('ID de periodo seleccionada:', selectedPeriodoId);
  this.periodo_idreceptor = selectedPeriodoId;
}


  
onSubmit() {
  if (this.updateForm && this.updateForm.valid) {
    const updatedCurs = this.updateForm.value;
    updatedCurs.curso_id = this.curso?.curso_id || 0;
     this.curso_idreceptor= updatedCurs.curso_id;

     this.carrera_idreceptor = updatedCurs.carrera_id;
     this.jornada_idreceptor = updatedCurs.jornada_id;
     this.periodo_idreceptor = updatedCurs.periodo_id;


    if (!updatedCurs.curso_id) {
      console.error('Error: ID de curso no válido');
      return;
    }


    this.curso_nombre_receptor = updatedCurs.curso_nombre;
    this.curso_paralelo_receptor = updatedCurs.curso_paralelo;
 
    console.log('Se enviará carrera_idreceptor:', this.carrera_idreceptor);
    console.log('Se enviará jornada_idreceptor:', this.jornada_idreceptor);
    console.log('Se enviará periodo_idreceptor:', this.periodo_idreceptor);

    console.log('Se enviará curso_nombre_receptor:', this.curso_nombre_receptor);
    console.log('Se enviará curso_paralelo_receptor:', this.curso_paralelo_receptor);
    this.curso2.curso_id=this.curso_idreceptor;
    this.curso2.curso_paralelo= this.curso_paralelo_receptor;
    this.curso2.curso_nombre=this.curso_nombre_receptor;
    this.curso2.modeloCarrera.carrera_id  =  this.carrera_idreceptor;
    this.curso2.modeloJornada.jornada_id=this.jornada_idreceptor;
    this.curso2.periodo.periodo_id=this.periodo_idreceptor;



    console.log( this.curso2);
    this.cursoService.updateCurso(this.curso2).subscribe(
      (updatedCurs: Curso) => {
        console.log('Curso actualizado con éxito:', updatedCurs);
        window.location.reload();

        window.close;

        console.log()
      },
      error => {
        console.error('Error al actualizar el curso:', error);
            window.location.reload();

        window.close;
      }
    );
  }
}
}

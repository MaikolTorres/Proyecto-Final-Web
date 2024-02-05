import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ActividadesDocente } from '../actividades-docente';
import { ActividadesDocenteService } from '../actividades-docente.service';
import { Asignatura } from 'src/app/asignatura/asignatura';
import { ExtraActividades } from 'src/app/extra-actividades/extra-actividades';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsignaturaService } from 'src/app/asignatura/asignatura.service';
import { ExtraActividadesService } from 'src/app/extra-actividades/extra-actividades.service';

@Component({
  selector: 'app-actualizar-docente-modal',
  templateUrl: './actualizar-docente-modal.component.html',
  styleUrls: ['./actualizar-docente-modal.component.css']
})
export class ActualizarDocenteModalComponent implements OnInit {
  @Input() actDocente: ActividadesDocente | undefined;
  actividoc_id: number | undefined;
  updateForm!: FormGroup;
  actDocente2: ActividadesDocente = new ActividadesDocente();

  asignaturas: Asignatura[] = [];
  asignatura2: Asignatura[] = [];
  
  extras: ExtraActividades[] = [];
  extra2: ExtraActividades[] = [];
  
  isLoading: boolean = true;



  public actDoc_idreceptor : number= 0;
  public asignaturas_idreceptor : number= 0;
  public extra_idreceptor : number= 0;
  public actividoc_nombre_actividad_receptor : string= '';
  public actividoc_horas_docencia_receptor  : number= 0;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private actDocService: ActividadesDocenteService,

    private http: HttpClient,
    private router: Router,
    private asignaturasService: AsignaturaService,
    private extraService: ExtraActividadesService

  ) {
    ///primero se debe inicializar antes de asignarles los valores
    this.actDocente2.modeloAsignaturas = new Asignatura();
    this.actDocente2.modeloExtrasActividades = new ExtraActividades();
  }

  ngOnInit() {
    this.loadAsignaturas();
    this.loadExtras();
    this.createForm();
    this.populateFormWithJornadaData();

  }

  


  loadAsignaturas() {
  this.asignaturasService.get().subscribe(
    (asignaturas: Asignatura[]) => {
      this.asignaturas = asignaturas;
      this.isLoading = false;
      this.populateFormWithJornadaData();
    },
    error => {
      console.error('Error al cargar las asignaturas:', error);
      this.isLoading = false;
    }
  );
}



loadExtras() {
  this.extraService.getExtras().subscribe(
    (extras: ExtraActividades[]) => {
      this.extras = extras;
      this.isLoading = false;
      this.populateFormWithJornadaData();
    },
    error => {
      console.error('Error al cargar las actividades extras:', error);
      this.isLoading = false;
    }
  );
}

createForm() {
  this.updateForm = this.fb.group({
    actividoc_nombre_actividad: ['', Validators.required],
    actividoc_horas_docencia: ['', Validators.required],
    asignatura_id: ['', Validators.required],
    extra_id: ['', Validators.required],
  });
}
  

populateFormWithJornadaData() {
  if (this.actDocente && this.asignaturas.length > 0 && this.extras.length > 0) {
    const selectedAsignatura = this.asignaturas.find(asig => asig.asignatura_id === this.actDocente?.modeloAsignaturas.asignatura_id);
    const selectedExtras = this.extras.find(extra => extra.extra_id === this.actDocente?.modeloExtrasActividades.extra_id);

    this.updateForm.patchValue({
      actividoc_nombre_actividad: this.actDocente.actividoc_nombre_actividad,
      actividoc_horas_docencia: this.actDocente.actividoc_horas_docencia,
      asignatura_id: selectedAsignatura ? selectedAsignatura.asignatura_id : null,
      extra_id: selectedExtras ? selectedExtras.extra_id : null, 
    });

    console.log('Datos que se van a actualizar:', {
      actividoc_nombre_actividad: this.actDocente.actividoc_nombre_actividad,
      actividoc_horas_docencia: this.actDocente.actividoc_horas_docencia,
      asignatura_id: selectedAsignatura ? selectedAsignatura.asignatura_id : null,
      extra_id: selectedExtras ? selectedExtras.extra_id : null, 
    });
  }
}



onasignaSelected(event: any) {
  const selectedAsignaturaID = event.target.value;
  console.log('ID de asignatura seleccionada:', selectedAsignaturaID);
  this.asignaturas_idreceptor = selectedAsignaturaID;
}
onextrasSelected(event: any) {
  const selectedExtrasId = event.target.value;
  console.log('ID de extras seleccionada:', selectedExtrasId);
  this.extra_idreceptor = selectedExtrasId;
}



  
onSubmit() {
  if (this.updateForm && this.updateForm.valid) {
    const updatedAct = this.updateForm.value;
    updatedAct.actividoc_id = this.actDocente?.actividoc_id || 0;
     this.actDoc_idreceptor= updatedAct.actividoc_id;
     this.asignaturas_idreceptor = updatedAct.asignatura_id;
     this.extra_idreceptor = updatedAct.extra_id;


    if (!updatedAct.actividoc_id) {
      console.error('Error: ID de actividad no válido');
      return;
    }


    this.actividoc_nombre_actividad_receptor = updatedAct.actividoc_nombre_actividad;
    this.actividoc_horas_docencia_receptor = updatedAct.actividoc_horas_docencia;
 
    console.log('Se enviará asignaturas_idreceptor:', this.asignaturas_idreceptor);
    console.log('Se enviará extra_idreceptor:', this.extra_idreceptor);
    console.log('Se enviará actividoc_nombre_idreceptor:', this.actividoc_nombre_actividad_receptor);
    console.log('Se enviará actividoc_horas_idreceptor:', this.actividoc_horas_docencia_receptor);
    this.actDocente2.actividoc_id=this.actDoc_idreceptor;;
    this.actDocente2.actividoc_nombre_actividad= this.actividoc_nombre_actividad_receptor;
    this.actDocente2.actividoc_horas_docencia=this.actividoc_horas_docencia_receptor;
    this.actDocente2.modeloAsignaturas.asignatura_id  =  this.asignaturas_idreceptor;
    this.actDocente2.modeloExtrasActividades.extra_id=this.extra_idreceptor;


    console.log( this.actDocente2);
    this.actDocService.updateActividad(this.actDocente2).subscribe(
      (updatedAct: ActividadesDocente) => {
        console.log('Actividad actualizado con éxito:', updatedAct);
        window.location.reload();

        window.close;

        console.log()
      },
      error => {
        console.error('Error al actualizar la Actividad:', error);
            window.location.reload();

        window.close;
      }
    );
  }
}
}

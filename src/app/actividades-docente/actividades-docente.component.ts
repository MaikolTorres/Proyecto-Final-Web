import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesDocente } from './actividades-docente';
import { ActividadesDocenteService } from './actividades-docente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Asignatura } from '../asignatura/asignatura';
import { ExtraActividades } from '../extra-actividades/extra-actividades';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsignaturaService } from '../asignatura/asignatura.service';
import { ExtraActividadesService } from '../extra-actividades/extra-actividades.service';

@Component({
  selector: 'app-actividades-docente',
  templateUrl: './actividades-docente.component.html',
  styleUrls: ['./actividades-docente.component.css']
})
export class ActividadesDocenteComponent implements OnInit {
  @Input() actDocente: ActividadesDocente | undefined;
  actividoc_id: number | undefined;
  updateForm!: FormGroup;

  actDocente1: ActividadesDocente[] = [];
  nuevaActDoc: ActividadesDocente = new ActividadesDocente();



  asignatura1: Asignatura[] = [];
  createasignatura: Asignatura= new Asignatura();
  public  nombreAsignaturaSelecionada: string = '';
  

  extraActvidad1: ExtraActividades[] = [];
  createextraActividad: ExtraActividades= new ExtraActividades();
  public  nombreExtraActSeleecionada: string = '';


  isLoading: boolean = true;
  botonDesactivado: boolean = false;

  actividoc_nombre_actividad: string = '';
  actividoc_horas_docencia: number = 0;




  constructor(private actDocService: ActividadesDocenteService, private router: Router,
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private asigService: AsignaturaService,
    private extraService: ExtraActividadesService,

  ) {
    this.createForm();

  }

  ngOnInit() {
    this.createForm();
    this.cargarAsignatura();
    this.cargarListaAsi();

    this.cargarExtras();
    this.cargarListaExtra();

  }
  initializeForm() {
    this.createForm();
  }



  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>('http://localhost:8080/asignatura');
  }

  cargarAsignatura() {
    this.getAsignaturas().subscribe((asignaturas) => (this.asignatura1 = asignaturas));
  }


  getExtra(): Observable<ExtraActividades[]> {
    return this.http.get<ExtraActividades[]>('http://localhost:8080/extrasactividades');
  }

  cargarExtras() {
    this.getExtra().subscribe((extras) => (this.extraActvidad1 = extras));
  }

  createForm() {
    this.updateForm = this.fb.group({
      actividoc_nombre_actividad: ['', Validators.required],
      actividoc_horas_docencia: ['', Validators.required],
      asignatura_id: ['', Validators.required],
      extra_id: ['', Validators.required],
    });
  }



  cargarListaAsi(): void {
    this.actDocService.getasiggg().subscribe(
      asignaturas => {
        this.asignatura1 = asignaturas;
        this.isLoading = false;
        console.log('Asignaturas cargados exitosamente:', asignaturas);
      },
      error => {
        console.error('Error al cargar las asignaturas:', error);
        this.isLoading = false;
      }
    );
  }


  cargarListaExtra(): void {
    this.actDocService.getextrasss().subscribe(
      extra => {
        this.extraActvidad1 = extra;
        this.isLoading = false;
        console.log('Actividad extra cargados exitosamente:', extra);
      },
      error => {
        console.error('Error al cargar las actividades extras:', error);
        this.isLoading = false;
      }
    );
  }

  onAsigSelected(event: any) {
    this.nombreAsignaturaSelecionada = event.target.value;
    const nombre = this.nombreAsignaturaSelecionada;
    this.asigService.getAsignaturaByName(nombre).subscribe(
      (asignatura: Asignatura | undefined) => {
        if (asignatura) {
          
        
          this.createasignatura=asignatura;
          console.log('Asignatura encontrado:',  this.createasignatura);

        } else {
          console.log('Asignatura no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la asignatura:', error);
      }
    );
  }

  

  onExtraSelected(event: any) {
    this.nombreExtraActSeleecionada = event.target.value;
    const nombre = this.nombreExtraActSeleecionada;
    this.extraService.getExtraByName(nombre).subscribe(
      (extra: ExtraActividades | undefined) => {
        if (extra) {
          
        
          this.createextraActividad=extra;
          console.log('Actividad extra encontrado:',  this.createextraActividad);

        } else {
          console.log('Actividad no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la actividad:', error);
      }
    );
  }



  crearActividad() {
    this.nuevaActDoc.modeloAsignaturas = this.createasignatura;
    this.nuevaActDoc.modeloExtrasActividades = this.createextraActividad;

    this.nuevaActDoc.actividoc_nombre_actividad = this.actividoc_nombre_actividad;
    this.nuevaActDoc.actividoc_horas_docencia = this.actividoc_horas_docencia;
    this.actDocService.createActividades(this.nuevaActDoc).subscribe(
      (response) => {

        console.log('Actividad creado exitosamente:', response);
        this.router.navigate(['/listar-actividades-docente']);
        
      },
      (error) => {
        console.error('Error al crear la actividad:', error);
      }
    );
  }

  
  cancelar(): void {
    this.router.navigate(['/listar-actividades-docente']);
  }




}

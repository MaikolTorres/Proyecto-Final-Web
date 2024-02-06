import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Docente } from 'src/app/docente/docente';
import { ActividadesNoDocente } from '../actividades-no-docente';
import { ActividadNoDocenteService } from '../actividad-no-docente.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DocenteService } from 'src/app/docente/docente.service';

@Component({
  selector: 'app-actualizar-no-docente',
  templateUrl: './actualizar-no-docente.component.html',
  styleUrls: ['./actualizar-no-docente.component.css'],
})
export class ActualizarNoDocenteComponent implements OnInit {
  @Input() actividad: ActividadesNoDocente | undefined;
  activinodoc_id: number | undefined;
  updateForm!: FormGroup;
  actividad2: ActividadesNoDocente = new ActividadesNoDocente();

  docentes: Docente[] = [];
  docente2: Docente[] = [];
  ckeckdocente: string = '';

  isLoading: boolean = true;

  public actividadND_idreceptor: number = 0;
  public docente_idreceptor: number = 0;
  public actividad_nombre_receptor: string = '';
  public actividad_horas_receptor: number = 0;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private actividadService: ActividadNoDocenteService,
    private docenteService: DocenteService

  ) {
    ///primero se debe inicializar antes de asignarles los valores
    this.actividad2.modeloDocente = new Docente();
  }

  ngOnInit() {
    this.loadDocentes();
    this.createForm();
    this.populateFormWithJornadaData();
  }


  createForm() {
    this.updateForm = this.fb.group({
      activinodoc_nombre: ['', Validators.required],
      activinodoc_num_horas: ['', Validators.required],
      docente_id: ['', Validators.required],
    });
  }


  ondocenteSelected(event: any) {
    const selectedDocenteId = event.target.value;
    console.log('ID de docente seleccionada:', selectedDocenteId);
    this.docente_idreceptor = selectedDocenteId;
  }


  loadDocentes() {
    this.docenteService.getDocentes().subscribe(
      (docentes: Docente[]) => {
        this.docentes = docentes;
        this.isLoading = false;
        this.populateFormWithJornadaData();
      },
      (error) => {
        console.error('Error al cargar los docentes:', error);
        this.isLoading = false;
      }
    );
  }
  populateFormWithJornadaData() {
    if (this.actividad && this.docentes.length > 0) {
      const selectedDocente = this.docentes.find(
        (docente) =>
          docente.docente_id === this.actividad?.modeloDocente.docente_id
      );

      this.updateForm.patchValue({
        activinodoc_nombre: this.actividad.activinodoc_nombre,
        activinodoc_num_horas: this.actividad.activinodoc_num_horas,
        docente_id: selectedDocente ? selectedDocente.docente_id : null, // Cambiado de 'c' a 'docente_id'
      });

      console.log('Datos que se van a actualizar:', {
        activinodoc_nombre: this.actividad.activinodoc_nombre,
        activinodoc_num_horas: this.actividad.activinodoc_num_horas,
        docente_id: selectedDocente ? selectedDocente.docente_id : null,
      });
    }
  }
  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedAct = this.updateForm.value;
      updatedAct.activinodoc_id = this.actividad?.activinodoc_id || 0;
      this.actividadND_idreceptor = updatedAct.activinodoc_id;
      this.docente_idreceptor = updatedAct.docente_id;

      if (!updatedAct.activinodoc_id) {
        console.error('Error: ID no válido');
        return;
      }

      this.actividad_nombre_receptor = updatedAct.activinodoc_nombre;
      this.actividad_horas_receptor = updatedAct.activinodoc_num_horas;

      console.log('Se enviará docente_idreceptor:', this.docente_idreceptor);
      console.log(
        'Se enviará nombreAct_idreceptor:',
        this.actividad_nombre_receptor
      );
      console.log(
        'Se enviará horas_idreceptor:',
        this.actividad_horas_receptor
      );
      this.actividad2.activinodoc_id = this.actividadND_idreceptor;
      this.actividad2.activinodoc_nombre = this.actividad_nombre_receptor;
      this.actividad2.activinodoc_num_horas = this.actividad_horas_receptor;
      this.actividad2.modeloDocente.docente_id = this.docente_idreceptor;

      console.log(this.actividad2);
      this.actividadService.updateAsignatura(this.actividad2).subscribe(
        (updatedAct: ActividadesNoDocente) => {
          console.log('Actividad actualizado con éxito:', updatedAct);
          window.location.reload();

          window.close;

          console.log();
        },
        (error) => {
          console.error('Error al actualizar la Actividad:', error);
          window.location.reload();

          window.close;
        }
      );
    }
  }
}

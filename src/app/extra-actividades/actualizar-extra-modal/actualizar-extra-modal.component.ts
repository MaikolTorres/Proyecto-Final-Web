import { Component, Input, OnInit } from '@angular/core';
import { ExtraActividades } from '../extra-actividades';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExtraActividadesService } from '../extra-actividades.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-extra-modal',
  templateUrl: './actualizar-extra-modal.component.html',
  styleUrls: ['./actualizar-extra-modal.component.css']
})
export class ActualizarExtraModalComponent implements OnInit {

  @Input() extra: ExtraActividades | undefined;
  extra_id: number | undefined;
  updateForm!: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private serviceExtra: ExtraActividadesService
  ) {}

  ngOnInit() {
    this.createForm();

    this.loadExtraDetails();
  }

  createForm() {
    this.updateForm = this.fb.group({
      extra_nombre_proyecto_investigacion: ['', Validators.required],
      extra_horas_investigacion: ['', Validators.required],
      extra_detalle_hora_gestion_academico: ['', Validators.required],
      extra_horas_direccion_gestion_academico_semanal: ['', Validators.required],
    });
  }

  loadExtraDetails() {
    if (this.extra_id) {
      this.serviceExtra.getById(this.extra_id).subscribe((actividad) => {
        this.updateForm.patchValue({
          extra_nombre_proyecto_investigacion: actividad.extra_nombre_proyecto_investigacion,
          extra_horas_investigacion: actividad.extra_horas_investigacion,
          extra_detalle_hora_gestion_academico: actividad.extra_detalle_hora_gestion_academico,
          extra_horas_direccion_gestion_academico_semanal: actividad.extra_horas_direccion_gestion_academica_semanal,
        });
      });
    }
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updateActividad = this.updateForm.value;
      updateActividad.extra_id = this.extra?.extra_id || 0;

      console.log('Actividad ID seleccionado:', updateActividad.extra_id);
      if (!updateActividad.extra_id) {
        console.error('Error: ID de actividad no válido');
        return;
      }

      this.serviceExtra.updateExtra(updateActividad).subscribe(
        (data) => {
          console.log('Actividad actualizado con éxito:', data);
          this.modalRef.hide();
        },
        (error) => {
          console.error('Error al actualizar la actividad:', error);

          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn(
              'El servidor respondió con un estado 200 pero el contenido no es JSON válido.'
            );
          } else {
          }
        }
      );
    }
  }

}

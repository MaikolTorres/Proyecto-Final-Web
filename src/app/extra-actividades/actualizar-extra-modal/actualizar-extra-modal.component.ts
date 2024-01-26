import { Component, Input, OnInit } from '@angular/core';
import { ExtraActividades } from '../extra-actividades';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExtraActividadesService } from '../extra-actividades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-extra-modal',
  templateUrl: './actualizar-extra-modal.component.html',
  styleUrls: ['./actualizar-extra-modal.component.css']
})
export class ActualizarExtraModalComponent implements OnInit {

  @Input() extra: ExtraActividades | undefined;
  extra_id: number | undefined;
  updateFormEX!: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private serviceExtra: ExtraActividadesService,
    private router: Router

  ) {}

  ngOnInit() {
    this.createForm();
    this.populateFormWithExtrData();
  }

  createForm() {
    this.updateFormEX = this.fb.group({
      extra_nombre_proyecto_investigacion: ['', Validators.required],
      extra_horas_investigacion: ['', Validators.required],
      extra_detalle_hora_gestion_academico: ['', Validators.required],
      extra_horas_direccion_gestion_academica_semanal: ['', Validators.required],
    });
  }

  populateFormWithExtrData()  {
    if (this.extra) {
      this.updateFormEX.patchValue({
        extra_nombre_proyecto_investigacion: this.extra.extra_nombre_proyecto_investigacion,
        extra_horas_investigacion: this.extra.extra_horas_investigacion,
        extra_detalle_hora_gestion_academico: this.extra.extra_detalle_hora_gestion_academico,
        extra_horas_direccion_gestion_academica_semanal: this.extra.extra_horas_direccion_gestion_academica_semanal,
      });
    }
  }

  onSubmit() {
    if (this.updateFormEX.valid && this.extra_id) {
      const updateActividad = this.updateFormEX.value;
      updateActividad.extra_id = this.extra_id;

      this.serviceExtra.updateExtra(updateActividad).subscribe(
        (data) => {
          console.log('Actividad actualizada con éxito:', data);
          this.modalRef.hide();
        },
        (error) => {
          console.error('Error al actualizar la actividad:', error);
          // Manejar otros tipos de errores
        }
      );
    } else {
      console.error('Error: formulario inválido o ID de actividad no proporcionado.');
    }
  }

  cancelar(): void {
    this.router.navigate(['/listar-extra-actividades']);
  }

}
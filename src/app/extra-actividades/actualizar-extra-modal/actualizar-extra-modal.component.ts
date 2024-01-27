import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExtraActividades } from '../extra-actividades';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ExtraActividadesService } from '../extra-actividades.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-extra-modal',
  templateUrl: './actualizar-extra-modal.component.html',
  styleUrls: ['./actualizar-extra-modal.component.css']
})
export class ActualizarExtraModalComponent implements OnInit {
  @Input() extra: ExtraActividades | undefined;
  @Output() ExtraActualizada= new EventEmitter<void>();
  updateForm!: FormGroup;

  constructor(public modalRef: BsModalRef, 
  private fb: FormBuilder, 
  private extraService: ExtraActividadesService,
  private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.populateFormWithRoleData();
  }

  createForm() {
    this.updateForm = this.fb.group({
      extra_nombre_proyecto_investigacion: ['', Validators.required],
      extra_horas_investigacion: ['', Validators.required],
      extra_detalle_hora_gestion_academico: ['', Validators.required],
      extra_horas_direccion_gestion_academica_semanal: ['', Validators.required]

    });
  }

  populateFormWithRoleData() {
    if (this.extra) {
      this.updateForm.patchValue({
        extra_nombre_proyecto_investigacion: this.extra.extra_nombre_proyecto_investigacion,
        extra_horas_investigacion: this.extra.extra_horas_investigacion,
        extra_detalle_hora_gestion_academico: this.extra.extra_detalle_hora_gestion_academico,
        extra_horas_direccion_gestion_academica_semanal: this.extra.extra_horas_direccion_gestion_academica_semanal

      });
    }
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedExtra = this.updateForm.value;
      updatedExtra.extra_id = this.extra?.extra_id || 0;

      if (!updatedExtra.extra_id) {
        console.error('Error: ID de la actividad no válido');
        return;
      }

      this.extraService.updateExtras(updatedExtra).subscribe(
        (data) => {
          console.log('Actividades Extras se ha actualizado con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana modal después de la actualización
          this.ExtraActualizada.emit(); // Emitir evento de persona actualizada
          alert('Actividades Extras actualizada exitosamente');
          this.router.navigate(['/listar-extra-actividades']); // Ruta de la misma página
        },
        (error) => {
          console.error('Error al actualizar la actividad:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
            // Mostrar el mensaje de éxito al usuario
            this.modalRef.hide(); // Cierra la ventana modal después de actualizar la persona
            this.ExtraActualizada.emit(); // Emitir evento de persona actualizada
            alert('Actividades Extras actualizada exitosamente');
            this.router.navigate(['/listar-extra-actividades']); // Ruta de la misma página
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    }
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ActividadesDocente } from '../actividades-docente';
import { ActividadesDocenteService } from '../actividades-docente.service';

@Component({
  selector: 'app-actualizar-docente-modal',
  templateUrl: './actualizar-docente-modal.component.html',
  styleUrls: ['./actualizar-docente-modal.component.css']
})
export class ActualizarDocenteModalComponent implements OnInit {

  @Input() activi: ActividadesDocente | undefined;
  actividoc_id: number | undefined;
  updateForm!: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private service: ActividadesDocenteService,
    private router: Router

  ) {}

  ngOnInit() {
    this.createForm();
    this.populateFormWithExtrData();
  }

  createForm() {
    this.updateForm = this.fb.group({
      actividoc_horas_docencia: ['', Validators.required],
      actividoc_nombre_actividad: ['', Validators.required],
      asignatura_id: ['', Validators.required],
      extra_id: ['', Validators.required],
    });
  }

  populateFormWithExtrData()  {
    if (this.activi) {
      this.updateForm.patchValue({
        actividoc_horas_docencia: this.activi.actividoc_horas_docencia,
        actividoc_nombre_actividad: this.activi.actividoc_nombre_actividad,
        asignatura_id: this.activi.asignatura_id,
        extra_id: this.activi.extra_id,
      });
    }
  }

  onSubmit() {
    if (this.updateForm.valid && this.actividoc_id) {
      const updateActividad = this.updateForm.value;
      updateActividad.extra_id = this.actividoc_id;

      this.service.updateActividad(updateActividad).subscribe(
        (data) => {
          console.log('Actividad actualizada con éxito:', data);
          this.modalRef.hide();
        },
        (error) => {
          console.error('Error al actualizar la actividad:', error);
        }
      );
    } else {
      console.error('Error: formulario inválido o ID de actividad no proporcionado.');
    }
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { GradoOcupacional } from '../grado-ocupacional';
import { GradoOcupacionalService } from '../grado-ocupacional.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-grado-modal',
  templateUrl: './actualizar-grado-modal.component.html',
  styleUrls: ['./actualizar-grado-modal.component.css']
})
export class ActualizarGradoModalComponent implements OnInit {
  @Input() grado: GradoOcupacional | undefined;
  @Output() cargoActualizado = new EventEmitter<void>();
  grado_Id: number | undefined;
  updateForm!: FormGroup;

  constructor(public modalRef: BsModalRef, private fb: FormBuilder, private gradoService: GradoOcupacionalService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.populateFormWithCargoData();
  }

  createForm() {
    this.updateForm = this.fb.group({
      grado_titulo: ['', Validators.required],
      grado_tipo_salario: ['', Validators.required],
      // Otros campos según tu modelo GradoOcupacional
    });
  }

  populateFormWithCargoData() {

    this.updateForm.patchValue({
      grado_titulo: this.grado?.grado_titulo,
      grado_tipo_salario: this.grado?.grado_tipo_salario,
      // Otros campos según tu modelo GradoOcupacional
    });

  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedGrado = this.updateForm.value;
      updatedGrado.grado_id = this.grado?.grado_id || 0;
  
      if (!updatedGrado.grado_id) {
        console.error('Error: ID de grado no válido');
        return;
      }
  
      this.gradoService.updateGrado(updatedGrado).subscribe(
        (data) => {
          console.log('Grado actualizado con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana modal después de la actualización
          alert('Grado actualizado exitosamente');
        },
        (error) => {
          console.error('Error al actualizar el grado:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
            alert('Grado actualizado exitosamente');
            this.modalRef.hide(); // Cierra la ventana modal después de la actualización
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    }
  }
}
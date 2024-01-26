import { Component, Input, OnInit } from '@angular/core';
import { TipoContrato } from '../tipo-contrato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TipoContratoService } from '../tipo-contrato.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-tipocontrato-modal',
  templateUrl: './actualizar-tipocontrato-modal.component.html',
  styleUrls: ['./actualizar-tipocontrato-modal.component.css'],
})
export class ActualizarTipocontratoModalComponent implements OnInit { 
  @Input() tipocontrato: TipoContrato | undefined;
  updateForm!: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private tipocontratoService: TipoContratoService
  ) {}

  ngOnInit() {
    this.createForm();
    this.populateFormWithTipoContratoData();
  }

  createForm() {
    this.updateForm = this.fb.group({
      tipo_contrato: ['', Validators.required],
      tipo_horas: ['', Validators.required],
      // Otros campos según tu modelo TipoContrato
    });
  }

  populateFormWithTipoContratoData() {
    if (this.tipocontrato) {
      this.updateForm.patchValue({
        tipo_contrato: this.tipocontrato.tipo_contrato,
        tipo_horas: this.tipocontrato.tipo_horas,
        // Otros campos según tu modelo TipoContrato
      });
    }
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedTipoContrato = this.updateForm.value;
      updatedTipoContrato.tipo_id = this.tipocontrato?.tipo_id || 0;

      console.log('Tipo Contrato ID seleccionado:', updatedTipoContrato.tipo_id);
      if (!updatedTipoContrato.tipo_id) {
        console.error('Error: ID de Tipo Contrato no válido');
        return;
      }

      this.tipocontratoService.updateTipoContrato(updatedTipoContrato).subscribe(
        (data) => {
          console.log('Tipo Contrato actualizado con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana desplegable después de la actualización
        },
        (error) => {
          console.error('Error al actualizar el Tipo Contrato:', error);

          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    }
  }
}
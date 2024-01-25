import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { JornadaService } from '../jornada.service';
import { Jornada } from '../jornada';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-jornada-modal',
  templateUrl: './actualizar-jornada-modal.component.html',
  styleUrls: ['./actualizar-jornada-modal.component.css']
})
export class ActualizarJornadaModalComponent implements OnInit {
  [x: string]: any;
  @Input() jornada: Jornada | undefined;
  @Output() jornadaActualizada = new EventEmitter<void>();
  updateForm!: FormGroup;

  constructor(public modalRef: BsModalRef, private fb: FormBuilder, private jornadaService: JornadaService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.populateFormWithJornadaData();
  }

  createForm() {
    this.updateForm = this.fb.group({
      jornada_nombre: ['', [Validators.required, this.validarMayusculas()]],
    });
  }

  validarMayusculas(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (value && !/^[A-Z][a-z]*$/.test(value)) {
        return { mayusculas: true };
      }
      return null;
    };
  }

  populateFormWithJornadaData() {
    if (this.jornada) {
      this.updateForm.patchValue({
        jornada_nombre: this.jornada.jornada_nombre,
      });
    }
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedJornada = this.updateForm.value;
      if (!this.jornada) {
        console.error('Error: No se ha proporcionado una jornada para actualizar.');
        return;
      }
      updatedJornada.jornada_id = this.jornada.jornada_id || 0;
  
      if (!updatedJornada.jornada_id) {
        console.error('Error: ID de jornada no válido');
        return;
      }
  
      this.jornadaService.updateJornada(updatedJornada).subscribe(
        data => {
          console.log('Jornada actualizada con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana modal después de actualizar la jornada
          this.jornadaActualizada.emit(); // Emitir evento de jornada actualizada
          // Mostrar el mensaje de éxito al usuario
          alert('Jornada actualizada exitosamente');
          this.router.navigate(['/actualizar-jornada']); // Ruta de la misma página
        },
        error => {
          console.error('Error al actualizar la jornada:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
            // Mostrar el mensaje de éxito al usuario
            this.modalRef.hide(); // Cierra la ventana modal después de actualizar la jornada
            this.jornadaActualizada.emit(); // Emitir evento de jornada actualizada
            this.jornadaActualizada.emit();
            this.router.navigate(['/actualizar-jornada']); // Ruta de la misma página

            alert('Jornada actualizada exitosamente');
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    } else {
      console.log('El formulario no es válido, muestra errores o realiza otras acciones.');
    }
  }
}
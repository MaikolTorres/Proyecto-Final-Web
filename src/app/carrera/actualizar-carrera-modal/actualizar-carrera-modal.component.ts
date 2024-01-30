import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Carrera } from '../carrera';
import { CarreraService } from '../carrera.service';

@Component({
  selector: 'app-actualizar-carrera-modal',
  templateUrl: './actualizar-carrera-modal.component.html',
  styleUrls: ['./actualizar-carrera-modal.component.css']
})
export class ActualizarCarreraModalComponent implements OnInit {
  @Input() carrera: Carrera | undefined;
  @Output() carreraActualizada = new EventEmitter<void>();
  updateForm!: FormGroup;

  constructor(
  public modalRef: BsModalRef, 
  private fb: FormBuilder, 
  private carreraService: CarreraService, 
  private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.populateFormWithCarreraData();
  }

  createForm() {
    this.updateForm = this.fb.group({
      carrera_nombre: ['', [Validators.required, this.validarMayusculas()]],
      carrera_modalidad: ['', [Validators.required, this.validarMayusculas()]],
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

  populateFormWithCarreraData() {
    if (this.carrera) {
      this.updateForm.patchValue({
        carrera_nombre: this.carrera.carrera_nombre,
        carrera_modalidad: this.carrera.carrera_modalidad
      });
    }
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedCarrera = this.updateForm.value;
      updatedCarrera.carrera_id = this.carrera?.carrera_id || 0;

      if (!updatedCarrera.carrera_id ) {
        console.error('Error: No se ha proporcionado una carrera para actualizar.');
        return;
      }
      this.carreraService.updateCarrera(updatedCarrera);
  
      if (!updatedCarrera.carrera_id) {
        console.error('Error: ID de carrera no válido');
        return;
      }
  
      this.carreraService.updateCarrera(updatedCarrera).subscribe(
        (data) => {
          console.log('Carrera actualizada con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana modal después de la actualización
          this.carreraActualizada.emit(); // Emitir evento de persona actualizada
          alert('Carrera actualizada exitosamente');
          this.router.navigate(['/actualizar-persona']); // Ruta de la misma página
        },
        (error) => {
          console.error('Error al Carrera la persona:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
            // Mostrar el mensaje de éxito al usuario
            this.modalRef.hide(); // Cierra la ventana modal después de actualizar la persona
            this.carreraActualizada.emit(); // Emitir evento de persona actualizada
            alert('Carrera actualizada exitosamente');
            this.router.navigate(['/actualizar-persona']); // Ruta de la misma página
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    }
  }
}
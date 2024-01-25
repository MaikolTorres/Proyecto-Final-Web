import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Persona } from '../persona';
import { PersonaService } from '../persona.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-persona-modal',
  templateUrl: './actualizar-persona-modal.component.html',
  styleUrls: ['./actualizar-persona-modal.component.css']
})
export class ActualizarPersonaModalComponent implements OnInit {
  @Input() persona: Persona | undefined;
  @Output() personaActualizada = new EventEmitter<void>();
  updateForm!: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private personaService: PersonaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.populateFormWithPersonaDetails();
  }

  createForm() {
    this.updateForm = this.fb.group({
      per_cedula: ['', Validators.required],
      per_primer_nombre: ['', Validators.required],
      per_segundo_nombre: ['', Validators.required],
      per_apellido_paterno: ['', Validators.required],
      per_apellido_materno: ['', Validators.required],
      per_telefono: ['', Validators.required],
      per_email: ['', Validators.required],
      // Otros campos según tu modelo Persona
    });
  }

  populateFormWithPersonaDetails() {
    if (this.persona ) {
      this.updateForm.patchValue({
        per_cedula: this.persona.per_cedula,
        per_primer_nombre: this.persona.per_primer_nombre,
        per_segundo_nombre: this.persona.per_segundo_nombre,
        per_apellido_paterno:this.persona.per_apellido_paterno,
        per_apellido_materno: this.persona.per_apellido_materno,
        per_telefono: this.persona.per_telefono,
        per_email: this.persona.per_email,
        // Otros campos según tu modelo Persona
      })
        
    }    
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedPersona = this.updateForm.value;
      updatedPersona.per_id = this.persona?.per_id || 0;

      if (!updatedPersona.per_id) {
        console.error('Error: ID de persona no válido');
        return;
      }

      this.personaService.updatePersona(updatedPersona).subscribe(
        (data) => {
          console.log('Persona actualizada con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana modal después de la actualización
          this.personaActualizada.emit(); // Emitir evento de persona actualizada
          alert('Persona actualizada exitosamente');
          this.router.navigate(['/actualizar-persona']); // Ruta de la misma página
        },
        (error) => {
          console.error('Error al actualizar la persona:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
            // Mostrar el mensaje de éxito al usuario
            this.modalRef.hide(); // Cierra la ventana modal después de actualizar la persona
            this.personaActualizada.emit(); // Emitir evento de persona actualizada
            alert('Persona actualizada exitosamente');
            this.router.navigate(['/actualizar-persona']); // Ruta de la misma página
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    }
  }
}
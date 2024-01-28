import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Titulo } from '../titulo';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TituloService } from '../titulo.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {  FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-actualizar-titulo',
  templateUrl: './actualizar-titulo.component.html',
  styleUrls: ['./actualizar-titulo.component.css']
})
export class ActualizarTituloComponent implements OnInit {
  @Input() titulo: Titulo | undefined;
  @Output() TituloActualizada = new EventEmitter<void>();
  updatetituloForm!: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private tituloService: TituloService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.populateFormWithTituloData();
  }

  createForm() {
    this.updatetituloForm = this.fb.group({
      titulo_nombre: ['', Validators.required]

    });
  }


  populateFormWithTituloData() {
    if (this.titulo) {
      this.updatetituloForm.patchValue({
        titulo_nombre: this.titulo.titulo_nombre
      });
    }
  }

  onSubmit() {
    if (this.updatetituloForm && this.updatetituloForm.valid) {
      const updatedPersona = this.updatetituloForm.value;
      updatedPersona.titulo_id = this.titulo?.titulo_id || 0;

      if (!updatedPersona.titulo_id) {
        console.error('Error: ID de persona no válido');
        return;
      }

      this.tituloService.updatetitulos(updatedPersona).subscribe(
        (data) => {
          console.log('Persona actualizada con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana modal después de la actualización
          this.TituloActualizada.emit(); // Emitir evento de persona actualizada
          alert('Persona actualizada exitosamente');
          this.router.navigate(['/actualizar-persona']); // Ruta de la misma página
        },
        (error) => {
          console.error('Error al actualizar la persona:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
            // Mostrar el mensaje de éxito al usuario
            this.modalRef.hide(); // Cierra la ventana modal después de actualizar la persona
            this.TituloActualizada.emit(); // Emitir evento de persona actualizada
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

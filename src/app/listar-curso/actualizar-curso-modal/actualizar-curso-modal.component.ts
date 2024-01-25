import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Curso } from '../curso';
import { CursoService } from '../curso.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-curso-modal',
  templateUrl: './actualizar-curso-modal.component.html',
  styleUrls: ['./actualizar-curso-modal.component.css']
})
export class ActualizarCursoModalComponent implements OnInit {
  @Input() curso: Curso | undefined;
  curso_id: number | undefined;
  updateForm!: FormGroup;

  constructor(public modalRef: BsModalRef, private fb: FormBuilder, private cursoService: CursoService) { }

  ngOnInit() {
    this.createForm();
 
    this.loadGradoDetails();
  }

  createForm() {
    this.updateForm = this.fb.group({
      curso_nombre: ['', Validators.required],
      curso_paralelo: ['', Validators.required],
      // Otros campos según tu modelo Jornada
      carrera_id: ['', Validators.required],
      jornada_id: ['', Validators.required],
      periodo_id: ['', Validators.required],
    });
  }

  loadGradoDetails() {
    if (this.curso_id) {
      this.cursoService.getcursoId(this.curso_id).subscribe(curso => {
        // Asegúrate de que this.updateForm esté inicializado
        this.updateForm.patchValue({
          curso_nombre: curso.curso_nombre,
          curso_paralelo: curso.curso_paralelo,

          carrera_id: curso.carrera_id,
          jornada_id: curso.jornada_id,
          periodo_id: curso.periodo_id,

        });
      });
    }
  }




  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedCurso = this.updateForm.value;
      updatedCurso.curso_id = this.curso?.curso_id || 0;
  
      console.log('Curso ID seleccionado:', updatedCurso.curso_id);
      if (!updatedCurso.curso_id) {
        console.error('Error: ID de curso no válido');
        return;
      }
  
      this.cursoService.updateCurso(updatedCurso).subscribe(
        data => {
          console.log('Curso actualizada con éxito:', data);
          this.modalRef.hide(); 
        },
        error => {
          console.error('Error al actualizar el curso:', error);
      
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
          } else {
          }
        }
      );
  }}


}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PeriodoService } from '../periodo.service';
import { Periodos } from '../periodo';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-periodo-modal',
  templateUrl: './actualizar-periodo-modal.component.html',
  styleUrls: ['./actualizar-periodo-modal.component.css']
})
export class ActualizarPeriodoModalComponent implements OnInit {

  @Input() periodo: Periodos | undefined;
  @Output() periodoActualizado = new EventEmitter<void>();
  periodo_id: number | undefined;
  updateForm!: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private service: PeriodoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.populateFormWithExtrData();
  }

  createForm() {
    this.updateForm = this.fb.group({
      periodo_mes_inicio: ['', Validators.required],
      periodo_mes_fin: ['', Validators.required],
      periodo_anio_inicio: ['', Validators.required],
      periodo_anio_fin: ['', Validators.required],
    });
  }

  populateFormWithExtrData()  {
    if (this.periodo) {
      this.updateForm.patchValue({
        periodo_mes_inicio: this.periodo.periodo_mes_inicio,
        periodo_mes_fin: this.periodo.periodo_mes_fin,
        periodo_anio_inicio: this.periodo.periodo_anio_inicio,
        periodo_anio_fin: this.periodo.periodo_anio_fin,
      });
    }
  }

  onSubmit() {

    if (this.updateForm && this.updateForm.valid) {
      const updatedPeriodo = this.updateForm.value;
      if (!this.periodo) {
        console.error('Error: No se ha proporcionado un periodo para actualizar.');
        return;
      }
      updatedPeriodo.periodo_id = this.periodo.periodo_id || 0;

      if (!updatedPeriodo.periodo_id) {
        console.error('Error: ID de periodo no válido');
        return;
      }

      this.service.updatePeriodo(updatedPeriodo).subscribe(
        (data) => {
          console.log('Periodo actualizado con éxito:', data);
          this.modalRef.hide(); 
          this.periodoActualizado.emit();
          alert('Periodo actualizado exitosamente');
          this.router.navigate(['/listar-periodo']);
        },
        (error) => {
          console.error('Error al actualizar el periodo:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
            this.modalRef.hide();
            this.periodoActualizado.emit();
            alert('Periodo actualizado exitosamente');
            this.router.navigate(['/listar-periodo']);
          } else {
          }
        }
      );
    }
  }
}
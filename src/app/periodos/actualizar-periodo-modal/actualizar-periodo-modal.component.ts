import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PeriodoService } from '../periodo.service';
import { Periodos } from '../periodo';

@Component({
  selector: 'app-actualizar-periodo-modal',
  templateUrl: './actualizar-periodo-modal.component.html',
  styleUrls: ['./actualizar-periodo-modal.component.css']
})
export class ActualizarPeriodoModalComponent implements OnInit {

  @Input() periodo: Periodos | undefined;
  periodo_id: number | undefined;
  updateFormEX!: FormGroup;

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
    this.updateFormEX = this.fb.group({
      periodo_mes_inicio: ['', Validators.required],
      periodo_mes_fin: ['', Validators.required],
      periodo_anio_inicio: ['', Validators.required],
      periodo_anio_fin: ['', Validators.required],
    });
  }

  populateFormWithExtrData()  {
    if (this.periodo) {
      this.updateFormEX.patchValue({
        periodo_mes_inicio: this.periodo.periodo_mes_inicio,
        periodo_mes_fin: this.periodo.periodo_mes_fin,
        periodo_anio_inicio: this.periodo.periodo_anio_inicio,
        periodo_anio_fin: this.periodo.periodo_anio_fin,
      });
    }
  }

  onSubmit() {
    if (this.updateFormEX.valid && this.periodo_id) {
      const updatePeriodo = this.updateFormEX.value;
      updatePeriodo.periodo_id = this.periodo_id;

      this.service.updatePeriodo(updatePeriodo).subscribe(
        (data) => {
          console.log('Periodo actualizado con éxito:', data);
          this.modalRef.hide();
        },
        (error) => {
          console.error('Error al actualizar el periodo:', error);
        }
      );
    } else {
      console.error('Error: formulario inválido o ID de periodo no proporcionado.');
    }
  }
}

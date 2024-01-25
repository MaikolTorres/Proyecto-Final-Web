import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cargo } from '../cargo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CargoserviceService } from '../cargoservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-cargo-modal',
  templateUrl: './actualizar-cargo-modal.component.html',
  styleUrls: ['./actualizar-cargo-modal.component.css'],
})
export class ActualizarCargoModalComponent implements OnInit{
  @Input() cargo: Cargo | undefined;
  @Output() cargoActualizado = new EventEmitter<void>();
  updateForm!: FormGroup;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private cargoService: CargoserviceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.populateFormWithCargoData();
  }

  createForm() {
    this.updateForm = this.fb.group({
      cargo_nombre: ['', Validators.required],
      cargo_descripcion: ['', Validators.required],
      // Otros campos según tu modelo Cargo
    });
  }

  populateFormWithCargoData() {
    if (this.cargo) {
      this.updateForm.patchValue({
        cargo_nombre: this.cargo.cargo_nombre,
        cargo_descripcion: this.cargo.cargo_descripcion,
        // Otros campos según tu modelo Cargo
      });
    }
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedCargo = this.updateForm.value;
      if (!this.cargo) {
        console.error('Error: No se ha proporcionado un cargo para actualizar.');
        return;
      }
      updatedCargo.cargo_id = this.cargo.cargo_id || 0;

      if (!updatedCargo.cargo_id) {
        console.error('Error: ID de cargo no válido');
        return;
      }

      this.cargoService.updateCargo(updatedCargo).subscribe(
        (data) => {
          console.log('Cargo actualizado con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana modal después de la actualización
          this.cargoActualizado.emit(); // Emitir evento de cargo actualizado
          alert('Cargo actualizado exitosamente');
          this.router.navigate(['/actualizar-cargo']); // Ruta de la misma página
        },
        (error) => {
          console.error('Error al actualizar el cargo:', error);
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
            // Mostrar el mensaje de éxito al usuario
            this.modalRef.hide(); // Cierra la ventana modal después de actualizar el cargo
            this.cargoActualizado.emit(); // Emitir evento de cargo actualizado
            alert('Cargo actualizado exitosamente');
            this.router.navigate(['/actualizar-cargo']); // Ruta de la misma página
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    }
  }
}
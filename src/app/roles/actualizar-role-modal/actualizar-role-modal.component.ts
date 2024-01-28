import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Rol } from '../roles';
import { RolesService } from '../roles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/Alert.service';

@Component({
  selector: 'app-actualizar-role-modal',
  templateUrl: './actualizar-role-modal.component.html',
  styleUrls: ['./actualizar-role-modal.component.css']
})
export class ActualizarRoleComponent implements OnInit {
  @Input() rol: Rol | undefined;
  @Output() cargoRol = new EventEmitter<void>();
  updateRolForm!: FormGroup;

  constructor(public modalRef: BsModalRef, 
  private fb: FormBuilder, 
  private rolesService: RolesService,
  private router: Router,
  private alertService: AlertService) { }

  ngOnInit() {
    this.createForm();
    this.populateFormWithRoleData();
  }

  createForm() {
    this.updateRolForm = this.fb.group({
      rol_nombre: ['', Validators.required],
      rol_descripcion: ['', Validators.required]
    });
  }

  populateFormWithRoleData() {
    if (this.rol) {
      this.updateRolForm.patchValue({
        rol_nombre: this.rol.rol_nombre,
        rol_descripcion: this.rol.rol_descripcion
      });
    }
  }

  onSubmit() {
    if (this.updateRolForm && this.updateRolForm.valid) {
      const updatedRoles = this.updateRolForm.value;
      if (!this.rol) {
        console.error('Error: No se ha proporcionado un rol para actualizar.');
        return;
      }
      updatedRoles.rol_id = this.rol?.rol_id || 0;
      if (!updatedRoles.rol_id) {
        console.error('Error: ID de rol no válido');
        return;
      }

      this.alertService.question2(
        'Confirmar actualización',
        '¿Actualizar este rol?',
        'Sí, actualizar',
        'Cancelar'
      ).then((confirmed) => {
        if (confirmed) {
          this.rolesService.updateRoles(updatedRoles).subscribe(
            (data) => {
              console.log('Rol actualizado con éxito:', data);
              this.modalRef.hide();  // Cierra la ventana modal después de la actualización
              //this.cargoRol.emit();
              this.alertService.notification('','Cargo actualizado exitosamente');
              window.location.reload(); // No es necesario recargar toda la página
              this.router.navigate(['/roles']);
            },
            error => {
              console.error('Error al actualizar el rol:', error);

              if (error instanceof HttpErrorResponse && error.status === 200) {
                console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
                // Mostrar un mensaje de error al usuario
                this.alertService.notification('','Error: El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
                this.alertService.notification('','Cargo actualizado exitosamente');
                this.cargoRol.emit();
                // window.location.reload(); // No es necesario recargar toda la página
                this.router.navigate(['/roles']);
              } else {
                // Manejar otros tipos de errores
              }
            }
          );
        }
      });
    }
  }
}
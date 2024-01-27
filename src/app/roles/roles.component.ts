import { Component, OnInit } from '@angular/core';
import { RolesService } from './roles.service';
import { Rol } from './roles';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActualizarRoleComponent } from './actualizar-role-modal/actualizar-role-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  [x: string]: any;

  roles: Rol[] = [];
  urlEndPoint_3: any;
  http: any;

  modalRef: BsModalRef | undefined;
  rol: Rol | undefined;
  nombreABuscar: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  rolesFiltradas: Rol[] = [];  // Nuevo array para las jornadas filtradas
  todasLosroles: Rol[] = [];

  constructor(private rolesService: RolesService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }

  cargarLista(): void {
    this.rolesService.getRoles().subscribe(
      roles => {
        this.roles = roles;
        this.isLoading = false; // Marcar la carga como completa después de recibir los roles
      },
      error => {
        console.error('Error al cargar los roles:', error);
        this.isLoading = false; // Marcar la carga como completa en caso de error
      }
    );
  }

  cargarRol(rol_id: number): void {
    this.rolesService.getrolesid(rol_id).subscribe(
      data => {
        this.rol = data;
        console.log(data); // Muestra la respuesta en la consola
        this.eliminarRol(this.rol.rol_id);  // Llamada a la función para abrir el modal
      },
      error => {
        console.error(error);
      }
    );
  }

  abrirModalActualizar(rol: Rol) {
    const initialState = {
      rol: rol,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };

    // Asignar la jornada al contexto del componente
    this.rol = rol;
    this.cargarLista;

    this.modalRef = this.modalService.show(ActualizarRoleComponent, { initialState });
  }

  eliminarRol(rol_id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este rol?')) {
      // Llama al servicio para eliminar el rol
      this.rolesService.deleteRol(rol_id).subscribe(
        data => {
          console.log('Rol eliminado con éxito:', data);
          window.location.reload();

          // Aquí puedes realizar acciones adicionales después de la eliminación
        },
        error => {
          console.error('Error al eliminar el rol:', error);
          window.location.reload();

          // Manejar el error según sea necesario
        }

      );
    }
  }
  textoBusqueda: string = '';

  // buscar

  rolMatchesSearch(rol: Rol): boolean {
    return rol.rol_nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '') {
      this.roles = this.roles.filter((rol: Rol) => this.rolMatchesSearch(rol));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}

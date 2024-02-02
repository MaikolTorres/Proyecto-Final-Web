import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Usuario } from './Usuario';
import { ActualizarUsuarioModalComponent } from './actualizar-usuario-modal/actualizar-usuario-modal.component';
import { Persona } from '../persona/persona';
import { RolesComponent } from '../roles/roles.component';
import { PersonaComponent } from '../persona/persona.component';
@Component({
  
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit{
  persona: PersonaComponent | undefined; 
  roles:RolesComponent | undefined

  [x: string]: any;
  usuarios:Usuario[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  usuFiltradas: Usuario[] = [];  // Nuevo array para las jornadas filtradas
  todasLasusu: Usuario[] = [];
  
  modalRef: BsModalRef | undefined;
    usuario: Usuario | undefined;
    constructor(private UsuarioService: UsuarioService, private modalService: BsModalService) {}
  


    ngOnInit(): void {
      this.cargarLista();
      FormsModule;  }
  
  
      cargarLista(): void {
        this.UsuarioService.getUsuarios().subscribe(
          usuarios => {
            this.usuarios = usuarios;
            this.isLoading = false;
            console.error('Error al cargar las usuarios:', usuarios);
            // Marcar la carga como completa después de recibir los roles
          },
          error => {
            console.error('Error al cargar las usuarios:', error);
            this.isLoading = false; // Marcar la carga como completa en caso de error
          }
        );
      }
      cargarUsuario(usu_id: number): void {
        this.UsuarioService.getUsuarioid(usu_id).subscribe(
          data => {
            this.usuario = data;
            console.log(data); // Muestra la respuesta en la consola
            this.eliminarUsu(this.usuario.usu_id);  // Llamada a la función para abrir el modal
          },
          error => {
            console.error(error);
          }
        );
      }
      arirModalActualizar(usuario: Usuario) {
        const initialState = {
          usuario: usuario,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
        };
    
        // Asignar la jornada al contexto del componente
        this.usuario= usuario;
        this.cargarLista;
        this.ngOnInit; // Carga los datos del usuario en el formulario

      
    
        this.modalRef = this.modalService.show(ActualizarUsuarioModalComponent, { initialState });
      }
      eliminarUsu(usu_id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta usuario?')) {
          // Llama al servicio para eliminar el rol
          this.UsuarioService.deleteUsuario(usu_id).subscribe(
            data => {
              console.log('usuario eliminado con éxito:', data);
              window.location.reload();

              // Aquí puedes realizar acciones adicionales después de la eliminación
            },
            error => {
              console.error('Error al eliminar el persona:', error);
              window.location.reload();

              // Manejar el error según sea necesario
            }
            
          );
        }
      }
      textoBusqueda: string = '';
      usuMatchesSearch(usuario: Usuario): boolean {
        return usuario.usu_usuario.toLowerCase().includes(this.textoBusqueda.toLowerCase());
      }
    
      buscar(): void {
        if (this.textoBusqueda.trim() !== '' ) {
          this.usuarios = this.usuarios.filter((usuario: Usuario) => this.usuMatchesSearch(usuario));
        } else {
          this.cargarLista(); // Vuelve a cargar todas las jornadas
        }
      }
    
}

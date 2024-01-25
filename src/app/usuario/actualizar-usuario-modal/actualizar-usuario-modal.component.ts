import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../Usuario';
import { UsuarioService } from '../usuario.service';
import { Persona } from 'src/app/persona/persona';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Rol } from 'src/app/roles/roles';

@Component({
  selector: 'app-actualizar-usuario-modal',
  templateUrl: './actualizar-usuario-modal.component.html',
  styleUrls: ['./actualizar-usuario-modal.component.css']
})
export class ActualizarUsuarioModalComponent implements OnInit {
  @Input() usuario: Usuario | undefined;
  usu_id: number | undefined;
  updateForm!: FormGroup;
  usuario1: Usuario[] = [];
  persona: Persona[] = [];
  persona1: Persona[] = [];
  roles: Rol[] = [];
  isLoading: boolean = true;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.createForm();
    this.cargarPersonas();
    this.loadUsuDetails();
    this.cargarLista();
    this.cargarListarol(); // Corregido para agregar paréntesis
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>('http://localhost:8080/personas');
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>('http://localhost:8080/roles'); // Corregido el tipo de retorno a Rol[]
  }

  // Cargar personas al inicializar el componente
  cargarPersonas() {
    this.getPersonas().subscribe(personas => (this.persona = personas));
  }

  createForm() {
    this.updateForm = this.fb.group({
      usu_usuario: ['', Validators.required],
      usu_contrase: ['', Validators.required],
      per_id: ['', Validators.required],
      rol_id: ['', Validators.required],
      // Otros campos según tu modelo Jornada
    });
  }

  cargarRoles() {
    this.getRoles().subscribe(roles => (this.roles = roles));
  }

  loadUsuDetails() {
    if (this.usu_id) {
      this.usuarioService.getUsuarioid(this.usu_id).subscribe(
        (usuario: Usuario) => {
          this.updateForm.patchValue({
            usu_usuario: usuario.usu_usuario,
            usu_contrase: usuario.usu_contrasena,
            per_id: usuario.persona.per_id,
            rol_id: usuario.rol.rol_id,
            // Otros campos según tu modelo Jornada
          });
        },
        error => {
          console.error('Error al cargar detalles del usuario:', error);
        }
      );
    }
  }

  cargarLista(): void {
    this.usuarioService.getpers().subscribe(
      personas => {
        this.persona1 = personas;
        this.isLoading = false;
        console.error('Error al cargar las usuarios:', personas);
      },
      error => {
        console.error('Error al cargar las usuarios:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListarol(): void {
    this.usuarioService.getrol().subscribe(
      roles => {
        this.roles = roles;
        this.isLoading = false;
        console.error('Error al cargar las roles:', roles);
      },
      error => {
        console.error('Error al cargar las roles:', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedUsu = this.updateForm.value;
      updatedUsu.usu_id = this.usuario?.usu_id || 0;

      console.log('usuario ID seleccionado:', updatedUsu.usu_id);
      if (!updatedUsu.usu_id) {
        console.error('Error: ID de usu no válido');
        return;
      }

      this.usuarioService.updateUsuario(updatedUsu).subscribe(
        data => {
          console.log('usuario actualizado con éxito:', data);
          this.modalRef.hide(); // Cierra la ventana desplegable después de la actualización
        },
        error => {
          console.error('Error al actualizar el usuario:', error);

          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.warn('El servidor respondió con un estado 200 pero el contenido no es JSON válido.');
          } else {
            // Manejar otros tipos de errores
          }
        }
      );
    }
  }
}

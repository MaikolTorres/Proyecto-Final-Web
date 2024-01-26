import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Persona } from '../persona/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from './Usuario';
import { Rol } from '../roles/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  @Input() usuario: Usuario | undefined;
  usu_id: number | undefined;
  updateForm!: FormGroup;
  usuario1: Usuario[] = [];
  persona1: Persona[] = [];
  roles: Rol[] = [];
  isLoading: boolean = true;
  nuevoUsu: Usuario = new Usuario();
  botonDesactivado: boolean = false;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router
  ) {


  }

  ngOnInit() {
    this.createForm();
    this.cargarPersonas();
    this.cargarRoles();
    this.cargarLista();
    this.cargarListarol();
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>('http://localhost:8080/personas');
  }

// Cargar personas al inicializar el componente
  cargarPersonas() {
    this.getPersonas().subscribe(personas => (this.persona1 = personas));
  }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>('http://localhost:8080/roles');
  }

  cargarRoles() {
    this.getRoles().subscribe(roles => (this.roles = roles));
  }

  createForm() {
    this.updateForm = this.fb.group({
      usu_usuario: ['', Validators.required],
      usu_contrasena: ['', Validators.required], // Corregir el nombre del campo
      per_id: ['', Validators.required],
      rol_id: ['', Validators.required]
    });
  }

  cargarLista(): void {
    this.usuarioService.getpers().subscribe(
      personas => {
        this.persona1 = personas;
        this.isLoading = false;
        console.log('Personas cargadas exitosamente:', personas);
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListarol(): void {
    this.usuarioService.getrol().subscribe(
      roles => {
        this.roles = roles;
        this.isLoading = false;
        console.log('Roles cargados exitosamente:', roles);
      },
      error => {
        console.error('Error al cargar los roles:', error);
        this.isLoading = false;
      }
    );
  }
  crearUsu() {
    // Desactivar el botón durante la solicitud
    this.botonDesactivado = true;
  
    const formData = this.updateForm.value;
  
    this.usuarioService.create(formData).subscribe(
      (response) => {
        // Éxito
        console.log('Usuario creado exitosamente:', response);
        // Resto de la lógica después de la creación exitosa
  
        // Cerrar la ventana después de guardar la jornada
        window.close();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al crear el usuario:', error);
        if (error.status === 401) {
          // Redirigir al usuario a la página de inicio de sesión
          this.router.navigate(['/login']);
        } else if (error.error && error.error.error) {
          // Muestra el mensaje de error específico del servidor al usuario
          alert(error.error.error);
        } else {
          // Muestra un mensaje de error genérico al usuario
          alert('Error al crear el usuario. Por favor, inténtelo de nuevo.');
        }
  
        // Reactivar el botón después de un error
        this.botonDesactivado = false;
      }
    );
  }


  cancelar(): void {
    this.router.navigate(['/usuario']);
  }
}

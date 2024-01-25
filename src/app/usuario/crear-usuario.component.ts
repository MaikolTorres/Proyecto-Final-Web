import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Persona } from '../persona/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from './Usuario';

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
  
  personas: Persona[] = [];
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso

  // Agrega HttpClient al constructor
  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private http: HttpClient // Agrega esta línea
  ) {}

  ngOnInit() {
    this.createForm();
    this.cargarPersonas(); // Llama a cargarPersonas al inicializar el componente
    this.loadUsuDetails();
    this.cargarListap();
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>('http://localhost:8080/personas');
  }

  // Cargar personas al inicializar el componente
  cargarPersonas() {
    this.getPersonas().subscribe(personas => (this.personas = personas));
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
  cargarListap(): void {
    this.usuarioService.getPersonas().subscribe(
      personas => {
        this.personas = personas;
        this.isLoading = false;
        console.error('Error al cargar las usuarios:', personas);
        // Marcar la carga como completa después de recibir los roles
      },
      error => {
        console.error('Error al cargar las usuarios:', error);
        this.isLoading = false; // Marcar la carga como completa en caso de error
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

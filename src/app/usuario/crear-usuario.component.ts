import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Persona } from '../persona/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from './Usuario';
import { Rol } from '../roles/roles';
import { RolesService } from '../roles/roles.service';
import { PersonaService } from '../persona/persona.service'
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
  createpersona: Persona = new Persona();
  roles: Rol[] = [];
  isLoading: boolean = true;
  username: string = '';
  usu_contrasena: string = '';
  nuevoUsu: Usuario = new Usuario();
  botonDesactivado: boolean = false;
  public ckeckrol: string = '';
  public rol2: Rol = new Rol();
  public cedulaSeleccionada: string = '';

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private http: HttpClient,
    private router: Router,
    private rolservice: RolesService,
    private personaservice: PersonaService,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.createForm();
    this.cargarPersonas();
    this.cargarRoles();
    this.cargarLista();
    this.cargarListarol();
  }

  initializeForm() {
    this.createForm();
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>('http://localhost:8080/personas');
  }

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
      username: ['', Validators.required],
      usu_contrasena: ['', Validators.required],
      per_id: ['', Validators.required],
      rol_id: ['', Validators.required]
    });
  }

  onRolSelected(event: any) {
    this.ckeckrol = event.target.value;
    const name = this.ckeckrol;

    this.rolservice.comboidrol(name).subscribe(
      (rolExists: boolean) => {
        if (rolExists) {
          console.log(`El rol ${name} existe.`);
          this.rolservice.getRolByName(name).subscribe(
            (rol: Rol | undefined) => {
              if (rol) {
                this.rol2 = rol;
                console.log('Rol encontrado:', this.rol2);
              } else {
                console.log('Rol no encontrado');
              }
            },
            (error) => {
              console.error('Error al obtener el rol:', error);
            }
          );
        } else {
          console.log(`El rol ${name} no existe.`);
        }
      },
      (error) => {
        console.error('Error al verificar el rol:', error);
      }
    );
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

  onCedulaSelected(event: any) {
    this.cedulaSeleccionada = event.target.value;
    const cedula = this.cedulaSeleccionada;
    this.personaservice.getbypersona(cedula).subscribe(
      (persona: Persona | undefined) => {
        if (persona) {
          this.createpersona = persona;
          console.log('Persona encontrado:', this.createpersona);
        } else {
          console.log('Persona no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la persona:', error);
      }
    );
  }
  crearUsu() {
    this.nuevoUsu.rol = this.rol2;
    this.nuevoUsu.persona = this.createpersona;
    this.nuevoUsu.username = this.username;
    this.nuevoUsu.usu_contrasena = this.usu_contrasena;
  
      this.usuarioService.create(this.nuevoUsu).subscribe(
        (response) => {
          console.log('Usuario creado exitosamente:', response);
          window.close();
        },
        (error) => {
          console.error('Error al crear el usuario:', error);
          console.log('datos enviados',this.nuevoUsu )
        }
      );
    
  }
  

  cancelar(): void {
    this.router.navigate(['/usuario']);
  }
}

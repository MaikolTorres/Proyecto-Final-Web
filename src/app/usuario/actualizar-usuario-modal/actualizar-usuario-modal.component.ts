import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Usuario } from '../Usuario';
import { UsuarioService } from '../usuario.service';
import { Persona } from 'src/app/persona/persona';
import { Rol } from 'src/app/roles/roles';
import { RolesService } from 'src/app/roles/roles.service';
import { PersonaService } from 'src/app/persona/persona.service';
import { Router } from '@angular/router';

import { AlertService } from 'src/app/service/Alert.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-actualizar-usuario-modal',
  templateUrl: './actualizar-usuario-modal.component.html',
  styleUrls: ['./actualizar-usuario-modal.component.css']
})
export class ActualizarUsuarioModalComponent implements OnInit {
  @Input() usuario: Usuario | undefined;
  updateForm!: FormGroup;
  roles: Rol[] = [];
  personas: Persona[] = [];
  isLoading: boolean = true;
  ckeckrol: string = '';
  rol2: Rol = new Rol();
  cedulaSeleccionada: string = '';
  usuario2: Usuario= new Usuario();
  
  public rol_idreceptor : number= 0;
  public user_idreceptor : number= 0;
  public persona_idreceptor : number= 0;
  public usu_usuario_receptor : string= '';
  public usu_contrasena_receptor  : string= '';
  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private rolservice: RolesService,
    private personaservice: PersonaService,

    private http: HttpClient,
    private alertService: AlertService

  ) {}

  ngOnInit() {
    
    this.loadRoles();
    this.loadPersonas();
    this.createForm();
    this.populateFormWithJornadaData();
   
  }
  probar(){
     if (this.updateForm && this.updateForm.valid) {
    const updatedUsu = this.updateForm.value;
    updatedUsu.usu_id = this.usuario?.usu_id || 0;
    console.log('Datos que se van a enviar para actualizar:', updatedUsu); // <-- Agregar este console.log

    if (!updatedUsu.usu_id) {
      console.error('Error: ID de usuario no válido');
      return;
    }
  }
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
  loadRoles() {
    this.rolservice.getRoles().subscribe(
      roles => {
        this.roles = roles;
        this.isLoading = false;
        this.populateFormWithJornadaData(); // Llamar a populateFormWithJornadaData() después de cargar los roles
      },
      error => {
        console.error('Error al cargar roles:', error);
        this.isLoading = false;
      }
    );
  }

  loadPersonas() {
    this.personaservice.getPersona().subscribe(
      (personas: Persona[]) => {
        this.personas = personas;
        this.isLoading = false;
        this.populateFormWithJornadaData(); // Llamar a populateFormWithJornadaData() después de cargar las personas
      },
      error => {
        console.error('Error al cargar personas:', error);
        this.isLoading = false;
      }
    );
  }

  createForm() {
    this.updateForm = this.fb.group({
      usu_usuario: ['', Validators.required],
      usu_contrasena: ['', Validators.required],
      per_id: ['', Validators.required],
      rol_id: ['', Validators.required],
    });
  }

  populateFormWithJornadaData() {
    if (this.usuario && this.roles.length > 0 && this.personas.length > 0) {
      const selectedRol = this.roles.find(rol => rol.rol_id === this.usuario?.rol.rol_id);
      const selectedPersona = this.personas.find(persona => persona.per_id === this.usuario?.persona.per_id);

      // Actualizar el formulario con los IDs guardados
      this.updateForm.patchValue({
        usu_usuario: this.usuario.usu_usuario,
        usu_contrasena: this.usuario.usu_contrasena,
        per_id: selectedPersona ? selectedPersona.per_id : null,
        rol_id: selectedRol ? selectedRol.rol_id : null,
      });

      // Imprimir en la consola los datos que se van a actualizar
      console.log('Datos que se van a actualizar:', {
        usu_usuario: this.usuario.usu_usuario,
        usu_contrasena: this.usuario.usu_contrasena,
        per_id: selectedPersona ? selectedPersona.per_id : null,
        rol_id: selectedRol ? selectedRol.rol_id : null,

      });
    }
  }

  onRolSelected(event: any) {
    const selectedRoleId = event.target.value;
    console.log('ID del rol seleccionado:', selectedRoleId);
    this.updateForm.patchValue({
      rol_id: selectedRoleId
    });
  }
  onPersonaSelected(event: any) {
    const selectedPersonaId = event.target.value;
    console.log('ID de la persona seleccionada:', selectedPersonaId);
    this.persona_idreceptor = selectedPersonaId;
}


  onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedUsu = this.updateForm.value;
      updatedUsu.usu_id = this.usuario?.usu_id || 0;
       this.user_idreceptor= updatedUsu.usu_id;
       this.persona_idreceptor = updatedUsu.per_id;
  
      if (!updatedUsu.usu_id) {
        console.error('Error: ID de usuario no válido');
        return;
      }
  
      // Asignar valores a las variables receptoras
      this.rol_idreceptor = updatedUsu.rol_id;
      this.usu_usuario_receptor = updatedUsu.usu_usuario;
      this.usu_contrasena_receptor = updatedUsu.usu_contrasena;
   
      console.log('Se enviará rol_idreceptor:', this.rol_idreceptor);
      console.log('Se enviará persona_idreceptor:', this.persona_idreceptor);
      console.log('Se enviará usuario_idreceptor:', this.usu_usuario_receptor);
      console.log('Se enviará contrasenia_idreceptor:', this.usu_contrasena_receptor);
      this.usuario2.usu_id=this.user_idreceptor;
      this.usuario2.usu_usuario= this.usu_usuario_receptor;
      this.usuario2.usu_contrasena=this.usu_contrasena_receptor;
      this.usuario2.persona.per_id  =  this.persona_idreceptor;
    
      this.usuario2.rol.rol_id=this.rol_idreceptor;
      console.log( this.usuario2);
      this.usuarioService.updateUsuario(this.usuario2).subscribe(
        (updatedUser: Usuario) => {
          console.log('Usuario actualizado con éxito:', updatedUser);
          window.location.reload();

          window.close;
          // Puedes agregar cualquier lógica adicional después de la actualización aquí
         console.log()
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
              window.location.reload();

          window.close;
        }
      );
    }
  }
  
}
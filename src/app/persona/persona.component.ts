import { Component, OnInit } from '@angular/core';
import { PersonaService } from './persona.service';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActualizarRoleComponent } from '../roles/actualizar-role-modal/actualizar-role-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Persona } from './persona';
import { ActualizarPersonaModalComponent } from './actualizar-persona-modal/actualizar-persona-modal.component';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})

export class PersonaComponent implements OnInit {
  [x: string]: any;
  personas: Persona[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true; // Nueva propiedad para rastrear si la carga está en progreso
  perFiltradas: Persona[] = [];  // Nuevo array para las jornadas filtradas
  todasLasper: Persona[] = [];

  modalRef: BsModalRef | undefined;
  persona: Persona | undefined;
  constructor(private personaService: PersonaService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.cargarLista();
    FormsModule;
  }


  cargarLista(): void {
    this.personaService.getPersona().subscribe(
      personas => {
        this.personas = personas;
        this.isLoading = false; // Marcar la carga como completa después de recibir los roles
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false; // Marcar la carga como completa en caso de error
      }
    );
  }

  cargarPersona(per_id: number): void {
    this.personaService.getpersonaid(per_id).subscribe(
      data => {
        this.persona = data;
        console.log(data); // Muestra la respuesta en la consola
        this.eliminarPer(this.persona.per_id);  // Llamada a la función para abrir el modal
      },
      error => {
        console.error(error);
      }
    );
  }
  abrirModalActualizar(persona: Persona) {
    const initialState = {
      persona: persona,  // Cambié 'jornada_Id' a 'jornada' para pasar el objeto completo
    };

    // Asignar la jornada al contexto del componente
    this.persona = persona;
    this.cargarLista;

    this.modalRef = this.modalService.show(ActualizarPersonaModalComponent, { initialState });
  }


  eliminarPer(per_id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      // Llama al servicio para eliminar el rol
      this.personaService.deletePersona(per_id).subscribe(
        data => {
          console.log('persona eliminado con éxito:', data);
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

  // buscar

  perMatchesSearch(persona: Persona): boolean {
    return persona.per_cedula.toLowerCase().includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '') {
      this.personas = this.personas.filter((persona: Persona) => this.perMatchesSearch(persona));
    } else {
      this.cargarLista(); // Vuelve a cargar todas las jornadas
    }
  }
}

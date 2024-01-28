import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Docente } from './docente';
import { Persona } from '../persona/persona';
import { TipoContrato } from '../tipo-contrato/tipo-contrato';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Cargo } from '../cargo/cargo';
import { GradoOcupacional } from '../grado-ocupacional/grado-ocupacional';
import { Periodos } from '../periodos/periodo';
import { Titulo } from '../titulo/titulo';
import { DocenteService } from './docente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creardocente',
  templateUrl: './creardocente.component.html',
  styleUrls: ['./creardocente.component.css']
})
export class CreardocenteComponent implements OnInit {
  @Input() docente: Docente | undefined;
  docente_id: number | undefined;
  updateForm!: FormGroup;
  docentes: Docente[] = [];
  personas: Persona[] = [];
contratos1: TipoContrato[] = [];
cargos: Cargo[] = [];
titulos: Titulo[] = [];
periodos: Periodos[] = [];
grados:GradoOcupacional[]=[];
isLoading: boolean = true;
nuevoDocente: Docente = new Docente();
botonDesactivado: boolean = false;
constructor(
  public modalRef: BsModalRef,
  private fb: FormBuilder,
  private docenteservice: DocenteService,
  private http: HttpClient,
  private router: Router,

) {}
ngOnInit() {
  this.createForm();
  this.loadDocenteDetails();
  this.cargarListaper();
  this.cargarListacontrato();
  this.cargarListacaro();
  this.cargarListatitulo();  
  this.cargarListaperiodo();
  this.cargarListagrado();



}
getPersonas(): Observable<Persona[]> {
  return this.http.get<Persona[]>('http://localhost:8080/personas');
}
getcontra(): Observable<TipoContrato[]> {
  return this.http.get<TipoContrato[]>('http://localhost:8080/tipocontratos');
}
getcargo(): Observable<Cargo[]> {
  return this.http.get<Cargo[]>('http://localhost:8080/cargo');
}
gettitulo(): Observable<Titulo[]> {
  return this.http.get<Titulo[]>('http://localhost:8080/titulo');
}
getperiodo(): Observable<Periodos[]> {
  return this.http.get<Periodos[]>('http://localhost:8080/periodos');
}
getgrado(): Observable<GradoOcupacional[]> {
  return this.http.get<GradoOcupacional[]>('http://localhost:8080/grado');
}
createForm() {
  this.updateForm = this.fb.group({
    fechaIngreso: ['', Validators.required],
    estado: ['', Validators.required],
    per_id: ['', Validators.required],
    tipo_id: ['', Validators.required],
    cargo_id: ['', Validators.required],
    titulo_id: ['', Validators.required],
    periodo_id: ['', Validators.required],
    grado_id: ['', Validators.required]
  });
}

cargarPer() {
  this.getPersonas().subscribe(personas => (this.personas = personas));
}
cargarcontratos() {
  this.getcontra().subscribe(contratos => (this.contratos1 = contratos));

}
cargarCargo() {
  this.getcargo().subscribe(cargos => (this.cargos = cargos));
}
cargarTitulos() {
  this.gettitulo().subscribe(roltituloses => (this.titulos = this.titulos));
}
cargarPeriodos() {
  this.getperiodo().subscribe(periodos => (this.periodos = periodos));
}
cargarGrado() {
  this.getgrado().subscribe(grados => (this.grados = grados));
}
loadDocenteDetails() {
  if (this.docente_id) {
    this.docenteservice.getdocentesId(this.docente_id).subscribe(
      (docente: Docente) => {
        this.updateForm.patchValue({
          docente_fecha_ingreso:docente.docente_fecha_ingreso, 
    docente_estado:docente.docente_estado,
    persona_id:docente.persona.per_id,
    tipo_contrato_id:docente.tipo_contrato.tipo_id,
    cargo_id:docente.cargo.cargo_id,
titulo_id:docente.titulo.titulo_id,
periodo_id:docente.periodo.periodo_id,
grado_id:docente.grado.grado_id,
          // Otros campos según tu modelo Jornada
        });
      },
      error => {
        console.error('Error al cargar detalles del usuario:', error);
      }
    );
  }
}
cargarListaper(): void {
  this.docenteservice.getpers().subscribe(
    personas => {
      this.personas = personas;
      this.isLoading = false;
      console.log('Usuarios cargados correctamente:', personas);
    },
    error => {
      console.error('Error al cargar las usuarios:', error);
      this.isLoading = false;
    }
  );
}

   cargarListacontrato(): void {
    this.docenteservice.getcontrato().subscribe(
      contratos => {
        this.contratos1 = contratos;  // Corregido aquí, utiliza el nombre correcto
        this.isLoading = false;
        console.log('Contratos cargados correctamente:', this.contratos1);
      },
      error => {
        console.error('Error al cargar los contratos:', error);
        this.isLoading = false;
      }
    );
  }
  cargarListacaro(): void {
    this.docenteservice.getcargo().subscribe(
      cargos => {
        this.cargos = cargos;
        this.isLoading = false;
        console.log('bien al cargar las cargos:', cargos);
      },
      error => {
        console.error('Error al cargar las usuarios:', error);
        this.isLoading = false;
      }
    );
  }
  cargarListatitulo(): void {
    this.docenteservice.gettitulo().subscribe(
      titulos => {
        this.titulos = titulos;
        this.isLoading = false;
        console.log('bien al cargar las titulos:', titulos);
      },
      error => {
        console.error('Error al cargar las usuarios:', error);
        this.isLoading = false;
      }
    );
  }
  cargarListaperiodo(): void {
    this.docenteservice.getperiodos().subscribe(
      periodos => {
        this.periodos = periodos;
        this.isLoading = false;
        console.log('bien al cargar las periodos:', periodos);
      },
      error => {
        console.error('Error al cargar las usuarios:', error);
        this.isLoading = false;
      }
    );
    
  }
cargarListagrado(): void {
    this.docenteservice.getgrado().subscribe(
      grados => {
        this.grados = grados;
        this.isLoading = false;
        console.log('bien  al cargar las grados:', grados);
      },
      error => {
        console.error('Error al cargar las usuarios:', error);
        this.isLoading = false;
      }
    );
    
  }
   onSubmit() {
    if (this.updateForm && this.updateForm.valid) {
      const updatedDOCE = this.updateForm.value;
      updatedDOCE.docente_id = this.docente?.docente_id || 0;

      console.log('usuario ID seleccionado:',    updatedDOCE.docente_id);
      if (!   updatedDOCE.docente_id) {
        console.error('Error: ID de usu no válido');
        return;
      }

      this.docenteservice.updatedocente(updatedDOCE).subscribe(
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
  creardoce() {
    // Desactivar el botón durante la solicitud
    this.botonDesactivado = true;
    // console.log('nuevoDocente:', this.nuevoDocente);
    // console.log('nuevoDocente.persona:', this.nuevoDocente.persona);
    const formData = this.updateForm.value;
    console.log('Datos del formulario:', formData);

    this.docenteservice.create(formData).subscribe(
      (response) => {
        // Éxito
        console.log('Docente creado exitosamente:', response);
        // Resto de la lógica después de la creación exitosa
  
        // Cerrar la ventana después de guardar el docente
        window.close();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al crear el docente:', error);
        if (error.status === 401) {
          // Redirigir al usuario a la página de inicio de sesión
          this.router.navigate(['/login']);
        } else if (error.error && error.error.error) {
          // Muestra el mensaje de error específico del servidor al usuario
          alert(error.error.error);
        } else {
          // Muestra un mensaje de error genérico al usuario
          alert('Error al crear el docente. Por favor, inténtelo de nuevo.');
        }
  
        // Reactivar el botón después de un error
        this.botonDesactivado = false;
      }
    );
}

  
  
  cancelar(): void {
    this.router.navigate(['/docente']);
  }
}

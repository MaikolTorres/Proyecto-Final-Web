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
import { PersonaService } from '../persona/persona.service';
import { TipoContratoService } from '../tipo-contrato/tipo-contrato.service';
import { CargoserviceService } from '../cargo/cargoservice.service';
import { TituloService } from '../titulo/titulo.service';
import { PeriodoService } from '../periodos/periodo.service';
import { GradoOcupacionalService } from '../grado-ocupacional/grado-ocupacional.service';

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
  grados: GradoOcupacional[] = [];
  isLoading: boolean = true;
  nuevoDocente: Docente = new Docente();
  botonDesactivado: boolean = false;
  public ckeckrol:string = '';
  public  cedulaSeleccionada: string = '';
  docente_fecha_ingreso = new Date();
  docente_estado : string = '';
  public  personaseleccionada: string = '';
  public selectedPersonaId: number | undefined;
  public selectedCargoId: number | undefined;
  public selectedcontratoId: number | undefined;
  public selectedtituloId: number | undefined;

  public selectedPeriodoId: number | undefined;
  public selectedgradoId: number | undefined;


  
      public  contraroSeleccionada: string = '';
  public  cargoSeleccionada: string = '';
  public  tituloSeleccionada: string = '';
  public  periodoSeleccionada: string = '';
  public  gradoSeleccionada: string = '';
  createpersona: Persona= new Persona();
  createcontrato: TipoContrato= new TipoContrato();
  public contrato2 : TipoContrato= new TipoContrato();
  public cargo2 : Cargo= new Cargo();
  public titulo2: Titulo= new Titulo();
  public periodo2: Periodos= new Periodos();
  public grado2: GradoOcupacional= new GradoOcupacional();
  public persona2 : Persona= new Persona();




  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private docenteservice: DocenteService,
    private http: HttpClient,
    private router: Router,
private personaservice:PersonaService,
private contratoservice:TipoContratoService,
private cargoservice:CargoserviceService,
private tituloservice:TituloService,
private periodoservice:PeriodoService,
private gradosservice:GradoOcupacionalService,






  ) {  this.createForm();}
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
  initializeForm() {
    this.createForm();
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
            docente_fecha_ingreso: docente.docente_fecha_ingreso,
            docente_estado: docente.docente_estado,
            persona_id: docente.persona.per_id,
            tipo_contrato_id: docente.tipo_contrato.tipo_id,
            cargo_id: docente.cargo.cargo_id,
            titulo_id: docente.titulo.titulo_id,
            periodo_id: docente.periodo.periodo_id,
            grado_id: docente.grado.grado_id,
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
    this.docenteservice.getTipoContrato().subscribe(
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
    this.docenteservice.getPeriodo().subscribe(
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
  oncedulaSelected(event: any) {
    const selectedPersonaId = event.target.value;
  
    this.personaservice.getprsonaByName(selectedPersonaId).subscribe(
        (persona: Persona | undefined) => {
            if (persona) {
                // Asegúrate de que this.updateForm esté definido
                if (this.updateForm) {
                  
                  this.updateForm.get('per_id')?.setValue(persona.per_id);
                  console.log('persona  encontrado');
  
                } else {
                    console.error('El formulario reactivo no está definido');
                }
            } else {
                console.log('titulo no encontrado');
            }
        },
        (error) => {
            console.error('Error al obtener el titulo:', error);
            // Manejo de errores
        }
    );
  }
/////////////////////////////////////////////////////////////////////////

oncontratoSelected(event: any) {
  const selectedContratoId = event.target.value;

  this.contratoservice.getcontratoByName(selectedContratoId).subscribe(
      (contrato: TipoContrato | undefined) => {
          if (contrato) {
              // Asegúrate de que this.updateForm esté definido
              if (this.updateForm) {
                  this.updateForm.get('tipo_id')?.setValue(contrato.tipo_id);
              } else {
                  console.error('El formulario reactivo no está definido');
              }
          } else {
              console.log('Contrato no encontrado');
          }
      },
      (error) => {
          console.error('Error al obtener el contrato:', error);
          // Manejo de errores
      }
  );
}



ontituloSelected(event: any) {
  const selectedtituloId = event.target.value;

  this.tituloservice.gettituloByName(selectedtituloId).subscribe(
      (titulo: Titulo | undefined) => {
          if (titulo) {
              // Asegúrate de que this.updateForm esté definido
              if (this.updateForm) {
                
                this.updateForm.get('titulo_id')?.setValue(titulo.titulo_id);
                console.log('titulo  encontrado');

              } else {
                  console.error('El formulario reactivo no está definido');
              }
          } else {
              console.log('titulo no encontrado');
          }
      },
      (error) => {
          console.error('Error al obtener el titulo:', error);
          // Manejo de errores
      }
  );
}

  ////////////////////////////////////////////////////////////////////

  onperiodoSelected(event: any) {
    const selectedPeriodoId = event.target.value;
  
    this.periodoservice.getperiodoByName(selectedPeriodoId).subscribe(
        (periodo: Periodos | undefined) => {
            if (periodo) {
                // Asegúrate de que this.updateForm esté definido
                if (this.updateForm) {
                    this.updateForm.get('periodo_id')?.setValue(periodo.periodo_id);
                    console.log('periodo  encontrado');

                  } else {
                    console.error('El formulario reactivo no está definido');
                }
            } else {
                console.log('periodo no encontrado');
            }
        },
        (error) => {
            console.error('Error al obtener el titulo:', error);
            // Manejo de errores
        }
    );
  }
////////////////////////////////////////////////////////////
oncargoSelected(event: any) {
  const selectedCargoId = event.target.value;

  this.cargoservice.getcargoByName(selectedCargoId).subscribe(
      (cargo: Cargo | undefined) => {
          if (cargo) {
              // Asegúrate de que this.updateForm esté definido
              if (this.updateForm) {
                  this.updateForm.get('cargo_id')?.setValue(cargo.cargo_id);
                  console.log('cargo  encontrado');

                } else {
                  console.error('El formulario reactivo no está definido');
              }
          } else {
              console.log('periodo no encontrado');
          }
      },
      (error) => {
          console.error('Error al obtener el titulo:', error);
          // Manejo de errores
      }
  );
}
/////////////////////////////////////////////////////////////////////////
ongradoSelected(event: any) {
  const selectedgradoId = event.target.value;

  this.gradosservice.getGradoByName(selectedgradoId).subscribe(
      (grados: GradoOcupacional | undefined) => {
          if (grados) {
              // Asegúrate de que this.updateForm esté definido
              if (this.updateForm) {
                  this.updateForm.get('grado_id')?.setValue(grados.grado_id);
                  console.log('grado  encontrado');

                } else {
                  console.error('El formulario reactivo no está definido');
              }
          } else {
              console.log('periodo no encontrado');
          }
      },
      (error) => {
          console.error('Error al obtener el titulo:', error);
          // Manejo de errores
      }
  );
}




creardoce() {
  const formData = this.updateForm.value;
  console.log('Datos del formulario antes de asignar al nuevoDocente:', formData);

  // Asignación explícita de propiedades al nuevoDocente
  this.nuevoDocente.docente_fecha_ingreso = formData.fechaIngreso;
  this.nuevoDocente.docente_estado = formData.estado;

  // Asegúrate de que haya una instancia válida de modelo_persona
  this.nuevoDocente.persona = new Persona();
  this.nuevoDocente.persona.per_id = formData.per_id;

  // Asegúrate de que haya una instancia válida de modelo_cargo
  this.nuevoDocente.cargo = new Cargo();
  this.nuevoDocente.cargo.cargo_id = formData.cargo_id;

  // Asegúrate de que haya una instancia válida de modelo_tipo_contrato
  this.nuevoDocente.tipo_contrato = new TipoContrato();
  this.nuevoDocente.tipo_contrato.tipo_id = formData.tipo_id;

  // Asegúrate de que haya una instancia válida de modelo_titulo
  this.nuevoDocente.titulo = new Titulo();
  this.nuevoDocente.titulo.titulo_id = formData.titulo_id;

  // Asegúrate de que haya una instancia válida de modelo_periodos
  this.nuevoDocente.periodo = new Periodos();
  this.nuevoDocente.periodo.periodo_id = formData.periodo_id;
  // Asegúrate de que haya una instancia válida de modelo_grado_ocupacional
  this.nuevoDocente.grado = new GradoOcupacional();
  this.nuevoDocente.grado.grado_id = formData.grado_id;

  console.log('Valores después de asignar al nuevoDocente:', this.nuevoDocente);

  // Resto del código...

  console.log('Datos del formulario antes de asignar al nuevoDocente:', formData);

  // Agrega esta línea para imprimir los datos del Docente antes de enviarlos al backend
  console.log('Docente que se enviará al backend:', this.nuevoDocente);

  this.docenteservice.create(formData).subscribe(
    (response: any) => {
      console.log('Docente creado exitosamente:', response);
      console.log('Docente ID asignado:', this.nuevoDocente.docente_id);
      console.log('Valores después de asignar al nuevoDocente:', this.nuevoDocente);

      // Verifica si la respuesta contiene un docente_id
      if (response && response.docente_id) {
        // Asigna el ID generado por el servidor al nuevoDocente
        this.nuevoDocente.docente_id = response.docente_id;
        console.log('Docente ID asignado:', this.nuevoDocente.docente_id);
      }

      // Resto de la lógica después de la creación exitosa
      window.close();
    },
    (error) => {
      console.error('Error al crear el docente:', error);
      // Manejo de errores
      if (error.status === 401) {
        this.router.navigate(['/login']);
      } else if (error.error && error.error.error) {
        alert(error.error.error);
      } else {
        alert('Error al crear el docente. Por favor, inténtelo de nuevo.');
      }
      this.botonDesactivado = false;
    }
  );
}



  cancelar(): void {
    this.router.navigate(['/docente']);
  }
}

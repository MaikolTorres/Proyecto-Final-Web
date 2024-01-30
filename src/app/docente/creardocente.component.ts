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
  onCedulaSelected(event: any) {
    this.nuevoDocente.persona = this.createpersona;

    this.personaseleccionada = event.target.value;
  const name = this.personaseleccionada;
  const selectedPersona = this.personas.find(persona => persona.per_cedula === event.target.value);
  
  if (selectedPersona) {
    this.selectedPersonaId = selectedPersona.per_id;
    this.cedulaSeleccionada = selectedPersona.per_cedula;
  }
  // Llamada al servicio para verificar el rol
  this.personaservice.comboidpersona(name).subscribe(
    (rolExists: boolean) => {
      if (rolExists) {
        console.log(`El persona ${name} existe.`);
        this.personaservice.getprsonaByName(name).subscribe(
          (persona: Persona | undefined) => {
            if (persona) {
              // Hacer algo con el rol encontrado
            
              this.persona2=persona;
              console.log('persona encontrado:', this.persona2);

            } else {
              // Manejar el caso en que no se encuentra el rol
              console.log('persona no encontrado');
            }
          },
          (error) => {
            // Manejar errores de la solicitud HTTP
            console.error('Error al obtener el persona:', error);
          }
        );
         
      } else {
        console.log(`El persona ${name} no existe.`);
     
      }
    },
    (error) => {
      console.error('Error al verificar el rol:', error);
    }
  );
  }
/////////////////////////////////////////////////////////////////////////
oncontratoSelected(event: any) {
     this.nuevoDocente.tipo_contrato = this.createcontrato;
  this.contraroSeleccionada = event.target.value;
  const name = this.contraroSeleccionada;

  // Llamada al servicio para verificar el rol
  this.contratoservice.comboidcontrato(name).subscribe(
    (rolExists: boolean) => {
      if (rolExists) {
        console.log(`El contrato ${name} existe.`);
        this.contratoservice.getcontratoByName(name).subscribe(
          (contrato: TipoContrato | undefined) => {
            if (contrato) {
              // Hacer algo con el rol encontrado
            
              this.contrato2=contrato;
              console.log('dontrato encontrado:', this.contrato2);

            } else {
              // Manejar el caso en que no se encuentra el rol
              console.log('contrato no encontrado');
            }
          },
          (error) => {
            // Manejar errores de la solicitud HTTP
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
ontituloSelected(event: any) {
  this.tituloSeleccionada = event.target.value;
  const name = this.tituloSeleccionada;

  // Llamada al servicio para verificar el rol
  this.tituloservice.comboidtitulo(name).subscribe(
    (rolExists: boolean) => {
      if (rolExists) {
        console.log(`El titulo ${name} existe.`);
        this.tituloservice.gettituloByName(name).subscribe(
          (titulo: Titulo | undefined) => {
            if (titulo) {
              // Hacer algo con el rol encontrado
            
              this.titulo2=titulo;
              console.log('titulo encontrado:', this.titulo2);

            } else {
              // Manejar el caso en que no se encuentra el rol
              console.log('titulo no encontrado');
            }
          },
          (error) => {
            // Manejar errores de la solicitud HTTP
            console.error('Error al obtener el cartitulogo:', error);
          }
        );
         
      } else {
        console.log(`El cargo ${name} no existe.`);
     
      }
    },
    (error) => {
      console.error('Error al verificar el cargo:', error);
    }
  );
}
  ////////////////////////////////////////////////////////////////////

  onperiodoSelected(event: any) {

    this.periodoSeleccionada = event.target.value;
    const name = this.periodoSeleccionada;
  
    // Llamada al servicio para verificar el rol
    this.periodoservice.comboidperiodo(name).subscribe(
      (rolExists: boolean) => {
        if (rolExists) {
          console.log(`El per ${name} existe.`);
          this.periodoservice.getperiodoByName(name).subscribe(
            (periodo: Periodos | undefined) => {
              if (periodo) {
                // Hacer algo con el rol encontrado
              
                this.periodo2=periodo;
                console.log('periodo encontrado:', this.periodo2);
  
              } else {
                // Manejar el caso en que no se encuentra el rol
                console.log('cargo no encontrado');
              }
            },
            (error) => {
              // Manejar errores de la solicitud HTTP
              console.error('Error al obtener el cargo:', error);
            }
          );
           
        } else {
          console.log(`El cargo ${name} no existe.`);
       
        }
      },
      (error) => {
        console.error('Error al verificar el cargo:', error);
      }
    );
  }
////////////////////////////////////////////////////////////
oncargoSelected(event: any) {
  this.cargoSeleccionada = event.target.value;
  const name = this.cargoSeleccionada;

  // Llamada al servicio para verificar el rol
  this.cargoservice.comboidcargo(name).subscribe(
    (rolExists: boolean) => {
      if (rolExists) {
        console.log(`El cargo ${name} existe.`);
        this.cargoservice.getcargoByName(name).subscribe(
          (cargo: Cargo | undefined) => {
            if (cargo) {
              // Hacer algo con el rol encontrado
            
              this.cargo2=cargo;
              console.log('caro encontrado:', this.cargo2);

            } else {
              // Manejar el caso en que no se encuentra el rol
              console.log('cargo no encontrado');
            }
          },
          (error) => {
            // Manejar errores de la solicitud HTTP
            console.error('Error al obtener el cargo:', error);
          }
        );
         
      } else {
        console.log(`El cargo ${name} no existe.`);
     
      }
    },
    (error) => {
      console.error('Error al verificar el cargo:', error);
    }
  );
}
/////////////////////////////////////////////////////////////////////////
ongradoSelected(event: any) {
  this.gradoSeleccionada = event.target.value;
  const name = this.gradoSeleccionada;

  // Llamada al servicio para verificar el rol
  this.gradosservice.comboidgrado(name).subscribe(
    (rolExists: boolean) => {
      if (rolExists) {
        console.log(`El grado ${name} existe.`);
        this.gradosservice.getGradoByName(name).subscribe(
          (grado: GradoOcupacional | undefined) => {
            if (grado) {
              // Hacer algo con el rol encontrado
            
              this.grado2=grado;
              console.log('caro encontrado:', this.cargo2);

            } else {
              // Manejar el caso en que no se encuentra el rol
              console.log('cargo no encontrado');
            }
          },
          (error) => {
            // Manejar errores de la solicitud HTTP
            console.error('Error al obtener el cargo:', error);
          }
        );
         
      } else {
        console.log(`El cargo ${name} no existe.`);
     
      }
    },
    (error) => {
      console.error('Error al verificar el cargo:', error);
    }
  );
}




  creardoce() {
this.nuevoDocente.docente_fecha_ingreso=this.docente_fecha_ingreso;
this.nuevoDocente.docente_estado=this.docente_estado;
if (this.selectedPersonaId !== undefined) {
  this.nuevoDocente.persona.per_id = this.selectedPersonaId;
} else {}
if (this.selectedCargoId !== undefined) {
  this.nuevoDocente.cargo.cargo_id = this.selectedCargoId;
} else {}

if (this.selectedcontratoId !== undefined) {
  this.nuevoDocente.tipo_contrato.tipo_id = this.selectedcontratoId;
} else {}

if (this.selectedtituloId !== undefined) {
  this.nuevoDocente.titulo.titulo_id = this.selectedtituloId;
} else {}
if (this.selectedPeriodoId !== undefined) {
  this.nuevoDocente.periodo.periodo_id = this.selectedPeriodoId;
} else {}

if (this.selectedgradoId !== undefined) {
  this.nuevoDocente.grado.grado_id = this.selectedgradoId;
} else {}

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
          console.log('docente_id:', this.nuevoDocente.docente_id);
          console.log('docente_fecha_ingreso:', this.nuevoDocente.docente_fecha_ingreso);
          console.log('docente_estado:', this.nuevoDocente.docente_estado);
          console.log('persona_id:', this.nuevoDocente.persona.per_id);
          console.log('tipo_id:', this.nuevoDocente.tipo_contrato.tipo_id);
          console.log('cargo_id:', this.nuevoDocente.cargo.cargo_id);
          console.log('titulo_id:', this.nuevoDocente.titulo.titulo_id);
          console.log('periodo_id:', this.nuevoDocente.periodo.periodo_id);
         console.log('grado_id:', this.nuevoDocente.grado.grado_id);
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

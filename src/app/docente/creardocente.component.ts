import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Docente } from './docente';
import { Persona } from '../persona/persona';
import { TipoContrato } from '../tipo-contrato/tipo-contrato';
import { HttpClient } from '@angular/common/http';
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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-creardocente',
  templateUrl: './creardocente.component.html',
  styleUrls: ['./creardocente.component.css']
})
export class CreardocenteComponent implements OnInit {
  docente_id: number | undefined;
  nuevodoce: Docente = new Docente();

  persona: any[] = [];
  nuevapersona: Persona = new Persona();

  tipocontrato: any[] = [];
  nuevotipocontrato: TipoContrato = new TipoContrato();

  cargo: any[] = [];
  nuevocargo: Cargo = new Cargo();

  titulo: any[] = [];
  nuevotitulo: Titulo = new Titulo();

  periodo: any[] = [];
  nuevoperiodo: Periodos = new Periodos();

  grado: any[] = [];
  nuevogrado: GradoOcupacional = new GradoOcupacional();

  updateForm!: FormGroup;
  @Input() docente: Docente | undefined;

  docente1: Docente[] = [];

  persona1: Persona[] = [];
  public cedulaSeleccionada: string = '';
  public estadoSeleccionada: string = '';

  tipocontrato1: TipoContrato[] = [];
  public contratoseleccionado: string = '';

  cargo1: Cargo[] = [];
  public cargoSeleccionada: string = '';

  titulo1: Titulo[] = [];
  public tituloSeleccionada: string = '';

  periodo1: Periodos[] = [];
  public periodoSeleccionada: string = '';

  grado1: GradoOcupacional[] = [];
  public gradoseleccionado: string = '';

  isLoading: boolean = true;
  botonDesactivado: boolean = false;

  docente_estado: string = '';
  docente_fecha_ingreso1: Date | undefined;


  constructor(
    private datePipe: DatePipe,
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private personaservice: PersonaService,
    private tipocontratoservice: TipoContratoService,
    private cargoservice: CargoserviceService,
    private tituloservice: TituloService,
    private periodosservice: PeriodoService,
    private gradoservice: GradoOcupacionalService,
    private docenteservice: DocenteService,

  ) {
    this.createForm();
  }

  ngOnInit() {
    this.createForm();
    this.cargarPersonas();
    this.cargarCargos();
    this.cargarcontratos();
    this.cargargrados();
    this.cargarperiodos();
    this.cargartitulos();

    this.cargarListaGrado();
    this.cargarListaPeriodo();
    this.cargarListacargo();
    this.cargarListacontrato();
    this.cargarListaper();
    this.cargarListatitulos();
  }

  initializeForm() {
    this.createForm();
  }
  /////
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>('http://localhost:8080/personas');
  }
  cargarPersonas() {
    this.getPersonas().subscribe(personas => (this.persona1 = personas));
  }
  ////

  getcontratos(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>('http://localhost:8080/tipocontratos');
  }
  cargarcontratos() {
    this.getcontratos().subscribe(contratos => (this.tipocontrato1 = contratos));
  }
  /////
  getcargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>('http://localhost:8080/cargo');
  }
  cargarCargos() {
    this.getcargos().subscribe(cargos => (this.cargo1 = cargos));
  }
  //////
  gettitulos(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>('http://localhost:8080/titulo');
  }

  cargartitulos() {
    this.gettitulos().subscribe(titulos => (this.titulo1 = titulos));
  }
  //////
  getperiodo(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>('http://localhost:8080/periodos');
  }

  cargarperiodos() {
    this.getperiodo().subscribe(periodos => (this.periodo1 = periodos));
  }
  ////////
  getgrado(): Observable<GradoOcupacional[]> {
    return this.http.get<GradoOcupacional[]>('http://localhost:8080/grado');
  }
  cargargrados() {
    this.getgrado().subscribe(grados => (this.grado1 = grados));
  }

  createForm() {
    this.updateForm = this.fb.group({
      docente_fecha_ingreso: ['', Validators.required],
      docente_estado: ['', Validators.required],
      per_id: ['', Validators.required],
      tipo_contrato_id: ['', Validators.required],
      cargo_id: ['', Validators.required],
      titulo_id: ['', Validators.required],
      periodo_id: ['', Validators.required],
      grado_id: ['', Validators.required],


    });
  }

  //////////////////////////////////////////////////////
  cargarListaper(): void {
    this.docenteservice.getPersonas().subscribe(
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

  cargarListacontrato(): void {
    this.docenteservice.getTipoContratos().subscribe(
      contratos => {
        this.tipocontrato1 = contratos;
        this.isLoading = false;
        console.log('contratos cargadas exitosamente:', contratos);
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListacargo(): void {
    this.docenteservice.getCargos().subscribe(
      cargos => {
        this.cargo1 = cargos;
        this.isLoading = false;
        console.log('cargos cargadas exitosamente:', cargos);
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListatitulos(): void {
    this.docenteservice.getTitulos().subscribe(
      titulos => {
        this.titulo1 = titulos;
        this.isLoading = false;
        console.log('titulos cargadas exitosamente:', titulos);
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListaPeriodo(): void {
    this.docenteservice.getPeriodos().subscribe(
      periodos => {
        this.periodo1 = periodos;
        this.isLoading = false;
        console.log('periodos cargadas exitosamente:', periodos);
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListaGrado(): void {
    this.docenteservice.getGrados().subscribe(
      grados => {
        this.grado1 = grados;
        this.isLoading = false;
        console.log('grados cargadas exitosamente:', grados);
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false;
      }
    );
  }

  onCedulaSelected(event: any) {
    this.cedulaSeleccionada = event.target.value;
    const cedula = this.cedulaSeleccionada;

    this.personaservice.getprsonaByName(cedula).subscribe(
      (persona: Persona | undefined) => {
        if (persona) {
          this.nuevapersona = persona;
          console.log('Persona encontrado:', this.nuevapersona);
        } else {
          console.log('Persona no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la persona:', error);
      }
    );
  }
  onDocenteEstadoChange(event: Event) {
    // Utiliza 'event' directamente para obtener el valor seleccionado
    this.docente_estado = (event.target as HTMLSelectElement).value;
  }
  oncontratoSelected(event: any) {
    this.contratoseleccionado = event.target.value;
    const contrato = this.contratoseleccionado;

    this.tipocontratoservice.getcontratoByName(contrato).subscribe(
      (contrato: TipoContrato | undefined) => {
        if (contrato) {
          this.nuevotipocontrato = contrato;
          console.log('contrato encontrado:', this.nuevotipocontrato);

          // Aquí se inicializa nuevotipocontrato correctamente
          this.nuevodoce.tipo_contrato = this.nuevotipocontrato;
        } else {
          console.log('contrato no encontrado');
        }
      },
      (error) => {
        
        console.error('Error al obtener la contrato:', error);
      }
    );
}

  oncargoSelected(event: any) {
    this.cargoSeleccionada = event.target.value;
    const cargo = this.cargoSeleccionada;

    this.cargoservice.getcargoByName(cargo).subscribe(
      (cargo: Cargo | undefined) => {
        if (cargo) {
          this.nuevocargo = cargo;
          console.log('cargo encontrado:', this.nuevocargo);
        } else {
          console.log('cargo no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la cargo:', error);
      }
    );
  }
  ontituloSelected(event: any) {
    this.tituloSeleccionada = event.target.value;
    const titulo = this.tituloSeleccionada;

    this.tituloservice.gettituloByName(titulo).subscribe(
      (titulo: Titulo | undefined) => {
        if (titulo) {
          this.nuevotitulo = titulo;
          console.log('titulo encontrado:', this.nuevotitulo);
        } else {
          console.log('titulo no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la titulo:', error);
      }
    );
  }
  onperiodoSelected(event: any) {
    this.periodoSeleccionada = event.target.value;
    const periodo = this.periodoSeleccionada;

    this.periodosservice.getperiodoByName(periodo).subscribe(
      (periodo: Periodos | undefined) => {
        if (periodo) {
          this.nuevoperiodo = periodo;
          console.log('periodo encontrado:', this.nuevoperiodo);
        } else {
          console.log('periodo no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la periodo:', error);
      }
    );
  }
  ongradoSelected(event: any) {
    this.gradoseleccionado = event.target.value;
    const grado = this.gradoseleccionado;

    this.gradoservice.getGradoByName(grado).subscribe(
      (grado: GradoOcupacional | undefined) => {
        if (grado) {
          this.nuevogrado = grado;
          console.log('grado encontrado:', this.nuevogrado);
        } else {
          console.log('grado no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la grado:', error);
      }
    );
  }






  crearDocente() {

    // Formatea la fecha
    const fechaIngreso = this.updateForm.get('docente_fecha_ingreso')?.value ?? new Date();
    this.nuevodoce.docente_fecha_ingreso = fechaIngreso;
    this.nuevodoce.docente_estado = this.updateForm.get('docente_estado')?.value;

    // Asigna los valores a los objetos correspondientes
    if (this.nuevapersona) {
      this.nuevodoce.persona = this.nuevapersona;
    }

    if (this.nuevotipocontrato) {
      this.nuevodoce.tipo_contrato = this.nuevotipocontrato;
    } 
    
    if (this.nuevocargo) {
      this.nuevodoce.cargo = this.nuevocargo;
      console.log(
        'cargo', this.nuevocargo)
    }

    if (this.nuevotitulo) {
      this.nuevodoce.titulo = this.nuevotitulo;
    }

    if (this.nuevoperiodo) {
      this.nuevodoce.periodo = this.nuevoperiodo;
    }

    if (this.nuevogrado) {
      this.nuevodoce.grado = this.nuevogrado;
    }
    this.docenteservice.create(this.nuevodoce).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', this.nuevodoce);
        if (response && response.text) {
          console.log('Mensaje del servidor:', response.text);
          console.log('dat:', this.nuevodoce);
        }
        this.router.navigate(['/docente']);
      },
      (error) => {
        console.error('Error al crear el docente:', error);
        // Agrega un console.log para imprimir detalles sobre el error
        console.log('Detalles del error:', error.error);
        this.docenteservice.create(this.nuevodoce);
      }
    );
  }


  cancelar(): void {
    this.router.navigate(['/docente']);
  }
}

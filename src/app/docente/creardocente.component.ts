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
  public ckeckrol: string = '';
  public cedulaSeleccionada: string = '';
  docente_fecha_ingreso: string = '';
  docente_estado: string = '';
  public personaseleccionada: string = '';
  public selectedPersonaId: string = '';
  public selectedCargoId: string = '';
  public selectedcontratoId: string = '';
  public selectedtituloId: string = '';
  public selectedPeriodoId: string = '';
  public selectedgradoId: string = '';
  public contraroSeleccionada: string = '';
  public cargoSeleccionada: string = '';
  public tituloSeleccionada: string = '';
  public periodoSeleccionada: string = '';
  public gradoSeleccionada: string = '';
  createpersona: Persona = new Persona();
  createcontrato: TipoContrato = new TipoContrato();
  public contrato2: TipoContrato = new TipoContrato();
  public cargo2: Cargo = new Cargo();
  public titulo2: Titulo = new Titulo();
  public periodo2: Periodos = new Periodos();
  public grado2: GradoOcupacional = new GradoOcupacional();
  public persona2: Persona = new Persona();

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private docenteservice: DocenteService,
    private http: HttpClient,
    private router: Router,
    private personaservice: PersonaService,
    private contratoservice: TipoContratoService,
    private cargoservice: CargoserviceService,
    private tituloservice: TituloService,
    private periodoservice: PeriodoService,
    private gradosservice: GradoOcupacionalService,
  ) {
    this.createForm();
  }
  ngOnInit() {
    this.createForm();
    this.cargarListaper();
    this.cargarListacontrato();
    this.cargarListacargo();
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

  cargarListas() {
    this.cargarListaper();
    this.cargarListacontrato();
    this.cargarListacargo();
    this.cargarListatitulo();
    this.cargarListaperiodo();
    this.cargarListagrado();
  }

  cargarListaper() {
    this.docenteservice.getPersonas().subscribe(
      personas => {
        this.personas = personas;
        this.isLoading = false;
        console.log('Personas cargadas correctamente:', personas);
      },
      error => {
        console.error('Error al cargar las personas:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListacontrato() {
    this.docenteservice.getTipoContratos().subscribe(
      contratos => {
        this.contratos1 = contratos;
        this.isLoading = false;
        console.log('Contratos cargados correctamente:', contratos);
      },
      error => {
        console.error('Error al cargar los contratos:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListacargo() {
    this.docenteservice.getCargos().subscribe(
      cargos => {
        this.cargos = cargos;
        this.isLoading = false;
        console.log('Cargos cargados correctamente:', cargos);
      },
      error => {
        console.error('Error al cargar los cargos:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListatitulo() {
    this.docenteservice.getTitulos().subscribe(
      titulos => {
        this.titulos = titulos;
        this.isLoading = false;
        console.log('Títulos cargados correctamente:', titulos);
      },
      error => {
        console.error('Error al cargar los títulos:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListaperiodo() {
    this.docenteservice.getPeriodos().subscribe(
      periodos => {
        this.periodos = periodos;
        this.isLoading = false;
        console.log('Periodos cargados correctamente:', periodos);
      },
      error => {
        console.error('Error al cargar los periodos:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListagrado() {
    this.docenteservice.getGrados().subscribe(
      grados => {
        this.grados = grados;
        this.isLoading = false;
        console.log('Grados cargados correctamente:', grados);
      },
      error => {
        console.error('Error al cargar los grados:', error);
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
          // Manejar el caso en que no se encuentra el rol
          console.log('Persona no encontrado');
        }
      },
      (error) => {
        // Manejar errores de la solicitud HTTP
        console.error('Error al obtener la persona:', error);
      }
    );
  }

  oncontratoSelected(event: any) {
    const selectedContratoId = event.target.value;
    console.log('Contrato seleccionado:', selectedContratoId);
    // Aquí deberías implementar la lógica para cargar los datos según el contrato seleccionado
  }

  ontituloSelected(event: any) {
    const selectedTituloId = event.target.value;
    console.log('Título seleccionado:', selectedTituloId);
    // Aquí deberías implementar la lógica para cargar los datos según el título seleccionado
  }

  onperiodoSelected(event: any) {
    const selectedPeriodoId = event.target.value;
    console.log('Periodo seleccionado:', selectedPeriodoId);
    // Aquí deberías implementar la lógica para cargar los datos según el periodo seleccionado
  }

  oncargoSelected(event: any) {
    const selectedCargoId = event.target.value;
    console.log('Cargo seleccionado:', selectedCargoId);
    // Aquí deberías implementar la lógica para cargar los datos según el cargo seleccionado
  }

  ongradoSelected(event: any) {
    const selectedGradoId = event.target.value;
    console.log('Grado seleccionado:', selectedGradoId);
    // Aquí deberías implementar la lógica para cargar los datos según el grado seleccionado
  }

  crearDocente() {
    this.nuevoDocente.persona = this.persona2;
    this.nuevoDocente.cargo = this.cargo2;
    this.nuevoDocente.grado = this.grado2,
    console.log('Docente que se enviará al backend:', this.nuevoDocente);

    this.docenteservice.createDocente(this.nuevoDocente)

  }


  cancelar(): void {
    this.router.navigate(['/docente']);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-creardocente',
  templateUrl: './creardocente.component.html',
  styleUrls: ['./creardocente.component.css']
})
export class CreardocenteComponent implements OnInit {
  updateForm!: FormGroup;

  @Input() docente: Docente | undefined;
  docente_id: number | undefined;
  docente1: Docente[] = [];
  persona1: Persona[] = [];
  tipocontrato1: TipoContrato[] = [];
  cargo1: Cargo[] = [];
  titulo1: Titulo[] = [];
  periodo1: Periodos[] = [];
  grado1: GradoOcupacional[] = [];
  createdocente: Docente = new Docente();
  isLoading: boolean = true;

  createpersona: Persona = new Persona();
  docente_fecha_ingreso!: Date;
  docente_estado: string = '';
  nuevodoce: Docente = new Docente();
  botonDesactivado: boolean = false;
  public ckeckrol: string = '';
  public persona2: Persona = new Persona();
  public tipocontrato2: TipoContrato = new TipoContrato();
  public cargo2: Cargo = new Cargo();
  public titulo2: Titulo = new Titulo();
  public periodo2: Periodos = new Periodos();
  public grado2: GradoOcupacional = new GradoOcupacional();
  public cedulaSeleccionada: string = '';
  public contratoseleccionado: string = '';
  public cargoSeleccionada: string = '';
  public tituloSeleccionada: string = '';
  public periodoSeleccionada: string = '';
  public gradoseleccionado: string = '';
  selectedPersonaId: number | undefined;
  selectedContratoId: number | undefined;
  selectedCargoId: number | undefined;
  selectedTituloId: number | undefined;
  selectedPeriodoId: number | undefined;
  selectedGradoId: number | undefined;

  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private docenteservice: DocenteService,
    private http: HttpClient,
    private router: Router,
    private personaservice: PersonaService,
    private tipocontratoservice: TipoContratoService,
    private cargoservice: CargoserviceService,
    private tituloservice: TituloService,
    private periodosservice: PeriodoService,
    private gradoservice: GradoOcupacionalService,
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

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>('http://localhost:8080/personas');
  }

  getcontratos(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>('http://localhost:8080/tipocontratos');
  }

  getcargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>('http://localhost:8080/cargo');
  }

  gettitulos(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>('http://localhost:8080/titulo');
  }

  getperiodo(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>('http://localhost:8080/periodos');
  }

  getgrado(): Observable<GradoOcupacional[]> {
    return this.http.get<GradoOcupacional[]>('http://localhost:8080/grado');
  }

  cargarPersonas() {
    this.getPersonas().subscribe(personas => (this.persona1 = personas));
  }

  cargarcontratos() {
    this.getcontratos().subscribe(contratos => (this.tipocontrato1 = contratos));
  }

  cargarCargos() {
    this.getcargos().subscribe(cargos => (this.cargo1 = cargos));
  }

  cargartitulos() {
    this.gettitulos().subscribe(titulos => (this.titulo1 = titulos));
  }

  cargarperiodos() {
    this.getperiodo().subscribe(periodos => (this.periodo1 = periodos));
  }

  cargargrados() {
    this.getgrado().subscribe(grados => (this.grado1 = grados));
  }

  onCedulaSelected(event: any) {
    this.cedulaSeleccionada = event.target.value;
    const cedula = this.cedulaSeleccionada;

    this.personaservice.getbypersona(cedula).subscribe(
      (persona: Persona | undefined) => {
        if (persona) {
          this.createpersona = persona;
          console.log('Persona encontrado:', this.createpersona);
          this.selectedPersonaId = this.createpersona.per_id;
        } else {
          console.log('Persona no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener la persona:', error);
      }
    );
  }

  oncontratosSelected(event: any) {
    this.ckeckrol = event.target.value;
    const name = this.ckeckrol;

    this.tipocontratoservice.comboidcontrato(name).subscribe(
      (contratoExists: boolean) => {
        if (contratoExists) {
          console.log(`El contrato ${name} existe.`);
          this.tipocontratoservice.getcontratoByName(name).subscribe(
            (tipo_contrato: TipoContrato | undefined) => {
              if (tipo_contrato) {
                this.tipocontrato2 = tipo_contrato;
                console.log('contrato encontrado:', this.tipocontrato2);
                this.selectedContratoId = this.tipocontrato2.tipo_id;
              } else {
                console.log('contrato no encontrado');
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

  oncargoSelected(event: any) {
    this.ckeckrol = event.target.value;
    const name = this.ckeckrol;

    this.cargoservice.comboidcargo(name).subscribe(
      (cargoexis: boolean) => {
        if (cargoexis) {
          console.log(`El caro ${name} existe.`);
          this.cargoservice.getcargoByName(name).subscribe(
            (cargo: Cargo | undefined) => {
              if (cargo) {
                this.cargo2 = cargo;
                console.log('contrato encontrado:', this.cargo2);
                this.selectedCargoId = this.cargo2.cargo_id;
              } else {
                console.log('cargo no encontrado');
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

  ontituloSelected(event: any) {
    this.ckeckrol = event.target.value;
    const name = this.ckeckrol;

    this.tituloservice.comboidtitulo(name).subscribe(
      (tituloexis: boolean) => {
        if (tituloexis) {
          console.log(`El titulo ${name} existe.`);
          this.tituloservice.gettituloByName(name).subscribe(
            (titulo: Titulo | undefined) => {
              if (titulo) {
                this.titulo2 = titulo;
                console.log('titulo encontrado:', this.titulo2);
                this.selectedTituloId = this.titulo2.titulo_id;
              } else {
                console.log('titulo no encontrado');
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

  onperiodoSelected(event: any) {
    this.ckeckrol = event.target.value;
    const name = this.ckeckrol;

    this.periodosservice.comboidperiodo(name).subscribe(
      (periodoexis: boolean) => {
        if (periodoexis) {
          console.log(`El periodo ${name} existe.`);
          this.periodosservice.getperiodoByName(name).subscribe(
            (periodo: Periodos | undefined) => {
              if (periodo) {
                this.periodo2 = periodo;
                console.log('periodo encontrado:', this.periodo2);
                this.selectedPeriodoId = this.periodo2.periodo_id;
              } else {
                console.log('periodo no encontrado');
              }
            },
            (error) => {
              console.error('Error al obtener el rol:', error);
            }
          );
        } else {
          console.log(`El periodo ${name} no existe.`);
        }
      },
      (error) => {
        console.error('Error al verificar el rol:', error);
      }
    );
  }

  ongradoSelected(event: any) {
    this.ckeckrol = event.target.value;
    const name = this.ckeckrol;

    this.gradoservice.comboidgrado(name).subscribe(
      (gradoexis: boolean) => {
        if (gradoexis) {
          console.log(`El graado ${name} existe.`);
          this.gradoservice.getGradoByName(name).subscribe(
            (grado: GradoOcupacional | undefined) => {
              if (grado) {
                this.grado2 = grado;
                console.log('grado encontrado:', this.grado2);
                this.selectedGradoId = this.grado2.grado_id;
              } else {
                console.log('contrato no encontrado');
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

  createForm() {
    this.updateForm = this.fb.group({
      fechaIngreso: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

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

  crearDocente() {
    if (this.docente) {
      const nuevoDocente: any = {
        fechaIngreso: this.docente_fecha_ingreso,
        estado: this.docente_estado,
        tipoContratoId: this.selectedContratoId,
        cargoId: this.selectedCargoId,
        tituloId: this.selectedTituloId,
        periodoId: this.selectedPeriodoId,
        gradoId: this.selectedGradoId,
        personaId: this.selectedPersonaId,
      };

      console.log('Nuevo Docente:', nuevoDocente);

      this.docenteservice.create(nuevoDocente).subscribe(
        (response) => {
          console.log('Docente creado exitosamente:', response);
        },
        (error) => {
          console.error('Error al crear el docente:', error);
        }
      );
    } else {
      console.error('Error: docente es undefined. No se puede crear el docente.');
    }
  }

  cancelar(): void {
    this.router.navigate(['/docentes']);
  }
}

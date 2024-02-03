// creardocente.component.ts

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
  @Input() docente: Docente | undefined;
  updateForm!: FormGroup;

  docente_fecha_ingreso: Date | undefined;
  docente_estado: String | undefined;
  public docentes: Docente[] = [];
  personas: Persona[] = [];
  contratos1: TipoContrato[] = [];
  cargos: Cargo[] = [];
  titulos: Titulo[] = [];
  periodos: Periodos[] = [];
  grados: GradoOcupacional[] = [];
  isLoading: boolean = true;
  botonDesactivado: boolean = false;
  nuevodocente: Docente = new Docente();
  public selectedPersonaId: number | undefined ;
  public selectedCargoId: number | undefined;
  public selectedContratoId: number | undefined;
  public selectedTituloId: number | undefined;
  public selectedPeriodoId: number | undefined;
  public selectedGradoId: number | undefined;
  public docentes2: Docente = new Docente();
  public persona2: Persona = new Persona();
  public contrato2: TipoContrato = new TipoContrato();
  public cargo2: Cargo = new Cargo();
  public titulo2: Titulo = new Titulo();
  public periodo2: Periodos = new Periodos();
  public grado2: GradoOcupacional = new GradoOcupacional();

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
    private gradosservice: GradoOcupacionalService
  ) {
    this.createForm();
    this.docente_fecha_ingreso = new Date(); // Puedes asignar la fecha actual o la que necesites
    this.docente_estado = ''; // Asegúrate de asignar un valor por defecto
  }

  ngOnInit() {
    this.createForm();
    this.cargarListaper();
    this.cargarListacontrato();
    this.cargarListacargo();
    this.cargarListatitulo();
    this.cargarListaperiodo();
    this.cargarListagrado();
    this.cargarPer();
    this.cargarcontratos();
    this.cargarCargo();
    this.cargarTitulos();
    this.cargarPeriodos();
    this.cargarGrado();
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
    this.gettitulo().subscribe(titulos => (this.titulos = titulos));
  }

  cargarPeriodos() {
    this.getperiodo().subscribe(periodos => (this.periodos = periodos));
  }

  cargarGrado() {
    this.getgrado().subscribe(grados => (this.grados = grados));
  }

  cargarListaper(): void {
    this.docenteservice.getPersonas().subscribe(
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
    this.docenteservice.getTipoContratos().subscribe(
      contratos => {
        this.contratos1 = contratos;
        this.isLoading = false;
        console.log('Contratos cargados correctamente:', this.contratos1);
      },
      error => {
        console.error('Error al cargar los contratos:', error);
        this.isLoading = false;
      }
    );
  }

  cargarListacargo(): void {
    this.docenteservice.getCargos().subscribe(
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
    this.docenteservice.getTitulos().subscribe(
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
    this.docenteservice.getPeriodos().subscribe(
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
    this.docenteservice.getGrados().subscribe(
      grados => {
        this.grados = grados;
        this.isLoading = false;
        console.log('bien al cargar las grados:', grados);
      },
      error => {
        console.error('Error al cargar las usuarios:', error);
        this.isLoading = false;
      }
    );
  }

  oncedulaSelected(event: any) {
    const selectedPersonaId = event.target.value;

    this.personaservice.getprsonaByName(this.selectedPersonaId).subscribe(
      (persona: Persona | undefined) => {
        if (persona) {
          if (this.updateForm) {
            this.updateForm.get('per_id')?.setValue(persona.per_id);
            console.log('persona encontrada');
          } else {
            console.error('El formulario reactivo no está definido');
          }
        } else {
          console.log('persona no encontrada');
        }
      },
      (error) => {
        console.error('Error al obtener la persona:', error);
      }
    );
  }

  oncontratoSelected(event: any) {
    const selectedContratoId = event.target.value;

    this.contratoservice.getcontratoByName(selectedContratoId).subscribe(
      (contrato: TipoContrato | undefined) => {
        if (contrato) {
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
      }
    );
  }

  ontituloSelected(event: any) {
    const selectedTituloId = event.target.value;

    this.tituloservice.gettituloByName(selectedTituloId).subscribe(
      (titulo: Titulo | undefined) => {
        if (titulo) {
          if (this.updateForm) {
            this.updateForm.get('titulo_id')?.setValue(titulo.titulo_id);
            console.log('titulo encontrado');
          } else {
            console.error('El formulario reactivo no está definido');
          }
        } else {
          console.log('titulo no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener el titulo:', error);
      }
    );
  }

  onperiodoSelected(event: any) {
    const selectedPeriodoId = event.target.value;

    this.periodoservice.getperiodoByName(selectedPeriodoId).subscribe(
      (periodo: Periodos | undefined) => {
        if (periodo) {
          if (this.updateForm) {
            this.updateForm.get('periodo_id')?.setValue(periodo.periodo_id);
            console.log('periodo encontrado');
          } else {
            console.error('El formulario reactivo no está definido');
          }
        } else {
          console.log('periodo no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener el periodo:', error);
      }
    );
  }

  oncargoSelected(event: any) {
    const selectedCargoId = event.target.value;

    this.cargoservice.getcargoByName(selectedCargoId).subscribe(
      (cargo: Cargo | undefined) => {
        if (cargo) {
          if (this.updateForm) {
            this.updateForm.get('cargo_id')?.setValue(cargo.cargo_id);
            console.log('cargo encontrado');
          } else {
            console.error('El formulario reactivo no está definido');
          }
        } else {
          console.log('cargo no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener el cargo:', error);
      }
    );
  }

  ongradoSelected(event: any) {
    const selectedGradoId = event.target.value;

    this.gradosservice.getGradoByName(selectedGradoId).subscribe(
      (grado: GradoOcupacional | undefined) => {
        if (grado) {
          if (this.updateForm) {
            this.updateForm.get('grado_id')?.setValue(grado.grado_id);
            console.log('grado encontrado');
          } else {
            console.error('El formulario reactivo no está definido');
          }
        } else {
          console.log('grado no encontrado');
        }
      },
      (error) => {
        console.error('Error al obtener el grado:', error);
      }
    );
  }

  creardoce() {
    // Asignar los IDs seleccionados al nuevo docente
    this.nuevodocente.persona = { per_id: this.selectedPersonaId?.toString() };
    this.nuevodocente.tipo_contrato = { tipo_id: this.selectedContratoId?.toString() };
    this.nuevodocente.cargo = { cargo_id: this.selectedCargoId?.toString() };
    this.nuevodocente.titulo = { titulo_id: this.selectedTituloId?.toString() };
    this.nuevodocente.periodo = { periodo_id: this.selectedPeriodoId?.toString() };
    this.nuevodocente.grado = { grado_id: this.selectedGradoId?.toString() };
    this.nuevodocente.docente_fecha_ingreso = this.docente_fecha_ingreso;
    this.nuevodocente.docente_estado = this.docente_estado;
  
    console.log('Datos del formulario:', this.nuevodocente);
  
    this.docenteservice.create(this.nuevodocente).subscribe(
      (response) => {
        console.log('Usuario creado exitosamente:', response);
        window.close();
      },
      (error) => {
        // Manejo de errores
        console.error('Error al crear el usuario:', error);
      }
    );
  }
  
  
  cancelar(): void {
    this.router.navigate(['/docente']);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Docente } from '../docente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/persona/persona';
import { TipoContrato } from 'src/app/tipo-contrato/tipo-contrato';
import { Cargo } from 'src/app/cargo/cargo';
import { Titulo } from 'src/app/titulo/titulo';
import { Periodos } from 'src/app/periodos/periodo';
import { GradoOcupacional } from 'src/app/grado-ocupacional/grado-ocupacional';
import { DocenteService } from '../docente.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actuaizar-docente-modal',
  templateUrl: './actuaizar-docente-modal.component.html',
  styleUrls: ['./actuaizar-docente-modal.component.css']
})
export class ActuaizarDocenteModalComponent implements OnInit {
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
  constructor(
    public modalRef: BsModalRef,
    private fb: FormBuilder,
    private docenteservice: DocenteService,
    private http: HttpClient
  ) { }
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
      docente_fecha_ingreso: ['', Validators.required],
      docente_estado: ['', Validators.required],
      persona_id: ['', Validators.required],
      tipo_contrato_id: ['', Validators.required],
      cargo_id: ['', Validators.required],
      titulo_id: ['', Validators.required],
      periodo_id: ['', Validators.required],
      grado_id: ['', Validators.required],

      // Otros campos según tu modelo Jornada
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
      this.docenteservice.getDocenteById(this.docente_id).subscribe(
        (docente: Docente) => {
          this.updateForm.patchValue({
            docente_fecha_ingreso: docente.docente_fecha_ingreso,
            docente_estado: docente.docente_estado,
            persona_id: docente.persona.per_id,
            tipo_contrato_id: docente.tipo_contrato?.tipo_id,
            cargo_id: docente.cargo.cargo_id,
            titulo_id: docente.titulo.titulo_id,
            periodo_id: docente.periodo.periodo_id,
            grado_id: docente.grado?.grado_id,
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
    this.docenteservice.getPersonas().subscribe(
      personas => {
        this.personas = personas;
        this.isLoading = false;
        console.error('Error al cargar las usuarios:', personas);
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
    this.docenteservice.getCargos().subscribe(
      cargos => {
        this.cargos = cargos;
        this.isLoading = false;
        console.error('Error al cargar las usuarios:', cargos);
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
        console.error('Error al cargar las usuarios:', titulos);
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
        console.error('Error al cargar las usuarios:', periodos);
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
        console.error('Error al cargar las usuarios:', grados);
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

      console.log('usuario ID seleccionado:', updatedDOCE.docente_id);
      if (!updatedDOCE.docente_id) {
        console.error('Error: ID de usu no válido');
        return;
      }

      this.docenteservice.updateDocente(updatedDOCE).subscribe(
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

}


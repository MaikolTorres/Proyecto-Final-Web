import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CarreraComponent } from '../carrera/carrera.component';
import { JornadaComponent } from '../jornada/jornada.component';
import { ListarCursoComponent } from '../listar-curso/listar-curso.component';
import { PeriodosComponent } from '../periodos/periodos.component';
import { AsignaturaComponent } from '../asignatura/asignatura.component';
import { DocenteComponent } from '../docente/docente.component';
import { ActividadesDocenteComponent } from '../actividades-docente/actividades-docente.component';
import { ActividadesNoDocenteComponent } from '../actividades-no-docente/actividades-no-docente.component';
import { Distributivo } from './Distributivo';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DistributivoService } from './distributivo.service';
import { FormsModule } from '@angular/forms';
import { Docente } from '../docente/docente';
import { jsPDF } from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';
import { DocenteService } from '../docente/docente.service';

@Component({
  selector: 'app-distributivo',
  templateUrl: './distributivo.component.html',
  styleUrls: ['./distributivo.component.css'],
})
export class DistributivoComponent implements OnInit {
  carrera: CarreraComponent | undefined;
  jornada: JornadaComponent | undefined;
  curso: ListarCursoComponent | undefined;
  periodo: PeriodosComponent | undefined;
  asignatura: AsignaturaComponent | undefined;
  docente: DocenteComponent | undefined;
  actdocente: ActividadesDocenteComponent | undefined;
  actnodocente: ActividadesNoDocenteComponent | undefined;

  docentes: Docente[] = [];
  [x: string]: any;
  distributivos: Distributivo[] = [];
  urlEndPoint_3: any;
  http: any;
  isLoading: boolean = true;
  disFiltradas: Distributivo[] = [];
  todasLaDistri: Distributivo[] = [];
  modalRef: BsModalRef | undefined;
  distributivo: Distributivo | undefined;
  constructor(
    private DistributivoService: DistributivoService,
    private modalService: BsModalService,
    private router: Router,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.cargarLista();
    this.cargarDistributivo;

    this.ngAfterViewInit();
  }

  cargarLista(): void {
    this.DistributivoService.getDistributivo().subscribe(
      (distributivos) => {
        this.distributivos = distributivos;
        this.isLoading = false;
        console.error('Error al cargar el distributivo:', distributivos);
      },
      (error) => {
        console.error('Error al cargar el distributivo:', error);
        this.isLoading = false;
      }
    );
  }
  cargarDistributivo(distributivo_id: number): void {
    this.DistributivoService.getdistributivoId(distributivo_id).subscribe(
      (data) => {
        this.distributivo = data;
        console.log(data);
        this.eliminardistributiv(this.distributivo.distributivo_id);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  arirModalActualizar(distributivo: Distributivo) {
    const initialState = {
      distributivo: distributivo,
    };
    this.distributivo = distributivo;
    this.cargarLista;

    //this.modalRef = this.modalService.show(ActualizarAsignaturaModalComponent, { initialState });
  }
  eliminardistributiv(distributivo_id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.DistributivoService.deleteD(distributivo_id).subscribe(
        (data) => {
          console.log('Registro eliminado con éxito:', data);
        },
        (error) => {
          console.error('Error al eliminar :', error);
        }
      );
    }
  }
  textoBusqueda: string = '';
  usuMatchesSearch(distri: Distributivo): boolean {
    return (
      distri?.modeloDocente?.persona?.per_primer_nombre?.toLowerCase() +
      ' ' +
      distri?.modeloDocente?.persona?.per_apellido_paterno?.toLowerCase()
    ).includes(this.textoBusqueda.toLowerCase());
  }

  buscar(): void {
    if (this.textoBusqueda.trim() !== '') {
      this.distributivos = this.distributivos.filter(
        (distributivo: Distributivo) => this.usuMatchesSearch(distributivo)
      );
    } else {
      this.cargarLista();
    }
  }

  @ViewChild('reporte', { static: false }) el!: ElementRef;
  @ViewChild('inputFechaRef', { static: false }) inputFechaRef!: ElementRef;
  @ViewChild('inputFechaRefParra', { static: false })
  inputFechaRefParra!: ElementRef;
  @ViewChild('inputNroActaRef', { static: false }) inputNroActaRef!: ElementRef;
  mostrarBotonGenerarActa: boolean = true;
  imprimirReporte() {
    const btnGuardar = document.getElementById('btnImprimirActa');

    if (btnGuardar) {
      btnGuardar.style.display = 'none';
      // this.mostrarBotonGenerarActa = false;
      const doc = new jsPDF();
      // Ajustamos la altura del contenedor principal al contenido
      const container = this.el.nativeElement;
      const originalHeight = container.style.height;
      container.style.height = 'auto';

      // Agregamos una clase CSS para ocultar el botón "Generar Acta" en el PDF
      container.classList.add('ocultar-boton-generar');

      doc.html(container, {
        callback: (pdf) => {
          btnGuardar.style.display = 'block';

          // Restauramos la altura original del contenedor principal
          container.style.height = originalHeight;

          // Eliminamos la clase CSS para mostrar nuevamente el botón en la vista
          container.classList.remove('ocultar-boton-generar');

          pdf.save('.acta-transferencia');
        },
        margin: [20, 0, 40, 0],
        autoPaging: 'text',
        x: 0,
        y: 0,
        width: doc.internal.pageSize.getWidth(),
        windowWidth: 1000,
      });
      this.router.navigate(['/distributivo']);
    }
  }

  ngAfterViewInit(): void {
    // Obtener la fecha actual y asignarla al campo inputFecha
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
    this.inputFechaRef.nativeElement.value = formattedDate;
    this.inputFechaRefParra.nativeElement.value = formattedDate;
    const randomNumber = Math.floor(Math.random() * 1000);

    // Formatear el número a un formato específico (por ejemplo, rellenar con ceros a la izquierda)
    const formattedNumber = randomNumber.toString().padStart(3, '0');

    // Asignar el número aleatorio al campo inputNroActa
    this.inputNroActaRef.nativeElement.value = formattedNumber;
  }
}

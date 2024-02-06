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
  ) { }

  ngOnInit(): void {
    this.cargarLista();
    this.cargarDistributivo;
    this.sumarHorasTotales();

  }

  cargarLista(): void {
    this.DistributivoService.getDistributivo().subscribe(
      (distributivos) => {
        this.distributivos = distributivos;
        this.isLoading = false;
        this.sumarHorasTotales(2);
        console.log('Éxito:', distributivos);
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
          console.error('Error al eliminar:', error);
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

  // Método para calcular las horas totales utilizando el ID del distributivo
  sumarHorasTotales(distributivoId?: number): number {
    if (!distributivoId) return 0;

    let distributivo = this.distributivos.find(dist => dist.distributivo_id === distributivoId);
    if (!distributivo) return 0;

    let totalHorasAsignatura = distributivo.modeloAsignaturas.asignatura_horas_clase_semana || 0;
    let totalHorasActividadDocente = distributivo.modeloActividadesDocentes.actividoc_horas_docencia || 0;
    let totalHorasActividadNoDocente = distributivo.modeloActividadesNoDocentes.activinodoc_num_horas || 0;
    let totalHoras = totalHorasAsignatura + totalHorasActividadDocente + totalHorasActividadNoDocente;
    console.log('Total de horas para el distributivo seleccionado:', totalHoras);
    return totalHoras;
  }


}

import { Component, OnInit } from '@angular/core';
import { CarreraService } from '../carrera/carrera.service';
import { JornadaService } from '../jornada/jornada.service';
import { Docente } from '../docente/docente';
import { Carrera } from '../carrera/carrera';
import { Jornada } from '../jornada/jornada';
import { Curso } from '../listar-curso/curso';
import { Periodos } from '../periodos/periodo';
import { Asignatura } from '../asignatura/asignatura';
import { ActividadesDocente } from '../actividades-docente/actividades-docente';
import { ActividadesNoDocente } from '../actividades-no-docente/actividades-no-docente';
import { DocenteService } from '../docente/docente.service';
import { AsignaturaService } from '../asignatura/asignatura.service';
import { ActividadesDocenteService } from '../actividades-docente/actividades-docente.service';
import { ActividadNoDocenteService } from '../actividades-no-docente/actividad-no-docente.service';
@Component({
  selector: 'app-creardistributivo',
  templateUrl: './creardistributivo.component.html',
  styleUrls: ['./creardistributivo.component.css']
})

export class CreardistributivoComponent implements OnInit {
  distributivo_id: number | undefined;
  docente: any[] = [];
  nuevodocente : Docente = new Docente();
  carreras: any[] = []; // Arreglo para almacenar las carreras
  nuevoCarreras : Carrera = new Carrera();
  jornadas: any[] = []; // Arreglo para almacenar las jornadas
  nuevoJornda : Jornada = new Jornada();
  curso : any[]=[];
  nuevoCurso :Curso = new Curso();
  periodo :any[]=[];
  nuevoperidodo : Periodos = new Periodos();
  asignatura :any[]=[];
  nuevasigantura : Asignatura = new Asignatura();
  actividaddocente : any[]=[];
  nuevoacti : ActividadesDocente = new ActividadesDocente();
  actividadnodocente: any[]=[];
  nuevoactnodo : ActividadesNoDocente = new ActividadesNoDocente();

  constructor(private carreraService: CarreraService, 
  private jornadaService: JornadaService, 
  private docenteservice: DocenteService,
  private asignaturaservice : AsignaturaService,
  private actividadesDocenteService : ActividadesDocenteService,
  private ActividadNoDocenteService: ActividadesnoDocenteService,
  ) { }

  ngOnInit(): void {
    this.cargarCarreras();
    this.cargarJornadas();
  }

  cargarCarreras() {
    // Llama al servicio para obtener las carreras y las asigna al arreglo carreras
    this.carreraService.getCarrera().subscribe(
      (carreras: any[]) => {
        this.carreras = carreras;
      },
      (error) => {
        console.error('Error al cargar las carreras:', error);
      }
    );
  }

  cargarJornadas() {
    // Llama al servicio para obtener las jornadas y las asigna al arreglo jornadas
    this.jornadaService.getJornadas().subscribe(
      (jornadas: any[]) => {
        this.jornadas = jornadas;
      },
      (error) => {
        console.error('Error al cargar las jornadas:', error);
      }
    );
  }
}
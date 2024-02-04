import { Injectable } from '@angular/core';
import { Carrera } from '../carrera/carrera';
import { Jornada } from '../jornada/jornada';
import { Curso } from '../listar-curso/curso';
import { Periodos } from '../periodos/periodo';
import { Asignatura } from '../asignatura/asignatura';
import { ActividadesDocente } from '../actividades-docente/actividades-docente';
import { ActividadesNoDocente } from '../actividades-no-docente/actividades-no-docente';
import { Docente } from '../docente/docente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distributivo } from './Distributivo';

@Injectable({
  providedIn: 'root'
})
export class DistributivoService {

  carreras: Carrera[] = [];
  jornada: Jornada[] = [];
  curso: Curso[] = [];
  periodo: Periodos[] = [];
  asignatura: Asignatura[] = [];
  actDocente: ActividadesDocente[] = [];
  actnoDocente: ActividadesNoDocente[] = [];
  docente: Docente[] = [];



  constructor(private http: HttpClient) { }

  private urlEndPoint: string = 'http://localhost:8080/api/distributivo/listarDistributivo'

  private urlEndPoint_1: string = 'http://localhost:8080/api/distributivo/guardarDistributivo'


  //carrera
  private urlCarrera: string = 'http://localhost:8080/carrera/listarCarreras';
  private urlCarrera1: string = 'http://localhost:8080/api/carrera/listarCarreras';


  //jornada
  private urlJornada: string = 'http://localhost:8080/jornadas/listar';
  private urlJornada1: string = 'http://localhost:8080/api/jornadas/listar';

  //curso
  private urlCurso: string = 'http://localhost:8080/curso/listarCurso';
  private urlCurso1: string = 'http://localhost:8080/api/curso/listarCurso';

   //periodo
   private urlPeriodo: string = 'http://localhost:8080/periodos/listar';
   private urlPeriodo1: string = 'http://localhost:8080/api/periodos/listar';
 
   //asignatura
   private urlAsignatura: string = 'http://localhost:8080/asignatura/listarAsignatura';
   private urlAsignatura1: string = 'http://localhost:8080/api/asignatura/listarAsignatura';


   //ACtDocente
   private urlActDocente: string = 'http://localhost:8080/actividadesdocentes/listarActividadesDocentes';
   private urlActDocente1: string = 'http://localhost:8080/api/actividadesdocentes/listarActividadesDocentes';
 
   //ActNODocente
   private urlActNODocente: string = 'http://localhost:8080/actividades-no-docentes/listarActividadesNoDocentes';
   private urlActNODocente1: string = 'http://localhost:8080/api/actividades-no-docentes/listarActividadesNoDocentes';
   

  //cdocentes
  private urlDocente: string = 'http://localhost:8080/docente/listar';
  private urlDocente1: string = 'http://localhost:8080/api/docente/listar';



  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  getDistributivo(): Observable<Distributivo[]> {

    return this.http.get<Distributivo[]>(this.urlEndPoint);
  }

  create(distributivo: Distributivo): Observable<Distributivo> {
    return this.http.post<Distributivo>(this.urlEndPoint_1, distributivo, { headers: this.httpHeaders })
  }

  getdistributivoId(id: number): Observable<Distributivo> {
    return this.http.get<Distributivo>(`${this.urlEndPoint_1}/${id}`)
  }

  //   deleteCliente(id: number): Observable<Cliente> {
  //     return this.http.delete<Cliente>(`${this.urlEndPoint_2}/${id}`);
  //   }

  deleteD(distri_id: number): Observable<Distributivo> {
    const url = `http://localhost:8080/api/distributivo/eliminarDistributivo/${distri_id}`; // Ajusta la URL según tu estructura
    return this.http.delete<Distributivo>(url);
  }


  updateDistributivo(distri_id: Distributivo): Observable<Distributivo> {
    const url = `http://localhost:8080/api/distributivo/eliminarDistributivo/${distri_id.distributivo_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Distributivo>(url, distri_id);
  }


  //carrerass
  getcarrss(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlCarrera1);
  }
  getCarrera(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlCarrera);
  }

  cargarCarreras() {
    this.getcarrss().subscribe(carreras => this.carreras = carreras);
  }


//cjornada
getjorss(): Observable<Jornada[]> {
  return this.http.get<Jornada[]>(this.urlJornada1);
}
getJornada(): Observable<Jornada[]> {
  return this.http.get<Jornada[]>(this.urlJornada);
}

cargarJornadas() {
  this.getjorss().subscribe(jorn => this.jornada = jorn);
}


//curso
getcurss(): Observable<Curso[]> {
  return this.http.get<Curso[]>(this.urlCurso1);
}
getCurso(): Observable<Curso[]> {
  return this.http.get<Curso[]>(this.urlCurso);
}

cargarCursos() {
  this.getcurss().subscribe(curs => this.curso = curs);
}


//periodo
getperidss(): Observable<Periodos[]> {
  return this.http.get<Periodos[]>(this.urlPeriodo1);
}
getPeriodo(): Observable<Periodos[]> {
  return this.http.get<Periodos[]>(this.urlPeriodo);
}

cargarPeriodos() {
  this.getperidss().subscribe(pero => this.periodo = pero);
}

//asignatura
getasigg(): Observable<Asignatura[]> {
  return this.http.get<Asignatura[]>(this.urlAsignatura1);
}
getAsignatura(): Observable<Asignatura[]> {
  return this.http.get<Asignatura[]>(this.urlAsignatura);
}

cargarAsignaturas() {
  this.getasigg().subscribe(asigg => this.asignatura = asigg);
}


//actDocente
getactDoccss(): Observable<ActividadesDocente[]> {
  return this.http.get<ActividadesDocente[]>(this.urlActDocente1);
}
getActDocente(): Observable<ActividadesDocente[]> {
  return this.http.get<ActividadesDocente[]>(this.urlActDocente1);
}

cargarActDocente() {
  this.getactDoccss().subscribe(actD => this.actDocente = actD);
}


//actNODocente
getactNoDocsss(): Observable<ActividadesNoDocente[]> {
  return this.http.get<ActividadesNoDocente[]>(this.urlActNODocente1);
}
getActNoDocente(): Observable<ActividadesNoDocente[]> {
  return this.http.get<ActividadesNoDocente[]>(this.urlActNODocente);
}

cargarActNoDocente() {
  this.getactNoDocsss().subscribe(actNoD => this.actnoDocente = actNoD);
}



  //docente
  getdoccente(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.urlDocente1);
  }
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.urlDocente);
  }

  cargarDocentes() {
    this.getdoccente().subscribe(doc => this.docente = doc);
  }


  getCarreraById(carreraId: number): Carrera | undefined {
    return this.carreras.find(carrera => carrera.carrera_id === carreraId);
  }

}

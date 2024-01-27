import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadesDocente } from './actividades-docente';
import { Asignatura } from '../asignatura/asignatura';
import { ExtraActividades } from '../extra-actividades/extra-actividades';


@Injectable({
  providedIn: 'root'
})
export class ActividadesDocenteService {


  
 
  asignatura: Asignatura[] = [];
  extraAc: ExtraActividades[] = [];
  //:Curso[]=[];


  
  constructor(private http: HttpClient) { }

  private urlEndPoint:string = 'http://localhost:8080/api/actividadesdocentes/listarActividadesDocentes';
  private urlEndPoint_1:string = 'http://localhost:8080/api/actividadesdocentes/guardarActividadDocente';
  private urlEndPoint_2:string = 'http://localhost:8080/api/actividadesdocentes/eliminarActividadDocente';
  private urlEndPoint_3:string = 'http://localhost:8080/api/actividadesdocentes/actualizarActividadDocente';
  private urlEndPoint_4:string = 'http://localhost:8080/api/actividadesdocentes/buscarActividadDocente';

   //curso
   private urlAsignatura: string = 'http://localhost:8080/asignatura/listarAsignatura';
   private urlAsignatura1: string = 'http://localhost:8080/api/asignatura/listarAsignatura';


//Extra actividades
private urlExtraAct: string = 'http://localhost:8080/extrasactividades/listarExtrasActividades';
private urlExtraAct1: string = 'http://localhost:8080/api/extrasactividades/listarExtrasActividades';


private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});


  getAct(): Observable<ActividadesDocente[]> {
    return this.http.get<ActividadesDocente[]>(this.urlEndPoint);
  }

 
  createActividades(data: ActividadesDocente): Observable<ActividadesDocente> {
    return this.http.post<ActividadesDocente>(this.urlEndPoint_1, data, { headers: this.httpHeaders })
  }


  updateActividad(actividad: ActividadesDocente): Observable<ActividadesDocente> {
    const url = `http://localhost:8080/api/actividadesdocentes/actualizarActividadDocente/${actividad.actividoc_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<ActividadesDocente>(this.urlEndPoint_3, actividad);
  }
  
  
  getactividadId(id:number):Observable<ActividadesDocente> {
    return this.http.get<ActividadesDocente>(`${this.urlEndPoint_1}/${id}`)
  }



deleteA(actividad_Id: number): Observable<ActividadesDocente> {
      const url = `http://localhost:8080/api/actividadesdocentes/eliminarActividadDocente/${actividad_Id}`; // Ajusta la URL según tu estructura
       return this.http.delete<ActividadesDocente>(url);
}


//asignatura
getasiggg(): Observable<Asignatura[]> {
  return this.http.get<Asignatura[]>(this.urlAsignatura1);
}
getAsignaturas(): Observable<Asignatura[]> {
  return this.http.get<Asignatura[]>(this.urlAsignatura);
}

cargarAsignaturas() {
  this.getasiggg().subscribe(asignatura => this.asignatura = asignatura);
}


//extra
getextrasss(): Observable<ExtraActividades[]> {
  return this.http.get<ExtraActividades[]>(this.urlExtraAct1);
}
getExtrasActs(): Observable<ExtraActividades[]> {
  return this.http.get<ExtraActividades[]>(this.urlExtraAct);
}

cargarExtras() {
  this.getextrasss().subscribe(doc => this.extraAc = doc);
}



}

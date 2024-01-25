import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadesDocente } from './actividades-docente';


@Injectable({
  providedIn: 'root'
})
export class ActividadesDocenteService {

  private urlEndPoint:string = 'http://localhost:8080/api/actividadesdocentes/listarActividadesDocentes';
  private urlEndPoint_1:string = 'http://localhost:8080/api/actividadesdocentes/guardarActividadDocente';
  private urlEndPoint_2:string = 'http://localhost:8080/api/actividadesdocentes/eliminarActividadDocente';
  private urlEndPoint_3:string = 'http://localhost:8080/api/actividadesdocentes/actualizarActividadDocente';
  private urlEndPoint_4:string = 'http://localhost:8080/api/actividadesdocentes/buscarActividadDocente';

  constructor(private http: HttpClient) { }

  getActividades(): Observable<ActividadesDocente[]> {
    return this.http.get<ActividadesDocente[]>(this.urlEndPoint);
  }

  getById(id: number): Observable<ActividadesDocente> {
    return this.http.get<ActividadesDocente>(`${this.urlEndPoint_4}/${id}`);
  }

  createActividades(data: ActividadesDocente): Observable<ActividadesDocente> {
    return this.http.post<ActividadesDocente>(this.urlEndPoint_1, data);
  }

  updateActividad(actividad: ActividadesDocente): Observable<ActividadesDocente> {
    const url = `http://localhost:8080/api/actividadesdocentes/actualizarActividadDocente/${actividad.actividoc_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<ActividadesDocente>(this.urlEndPoint_3, actividad);
  }
  
  deleteActividad(id: number): Observable<ActividadesDocente> {
    return this.http.delete<ActividadesDocente>(`${this.urlEndPoint_2}/${id}`);
  }

}

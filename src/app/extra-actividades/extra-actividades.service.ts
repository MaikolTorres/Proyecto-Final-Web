import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { ExtraActividades } from './extra-actividades';

@Injectable({
  providedIn: 'root',
})
export class ExtraActividadesService {
  [x: string]: any;
 


  private urlEndPoint:string = 'http://localhost:8080/api/extrasactividades/listarExtrasActividades'
  private urlEndPoint_1:string = 'http://localhost:8080/api/extrasactividades/guardarExtraActividad'
  private urlEndPoint_2:string = 'http://localhost:8080/api/extrasactividades/eliminarExtraActividad/{{id}}'
  private urlEndPoint_3:string = 'http://localhost:8080/api/extrasactividades/actualizarExtraActividad/{{id}}'
  private urlEndPoint_4:string = 'http://localhost:8080/api/extrasactividades/buscarExtraActividad/{{id}}'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  
  constructor(private http:HttpClient) {}

  
  getExtras(): Observable<ExtraActividades[]> {
 
    return this.http.get<ExtraActividades[]>(this.urlEndPoint);
  }
  create(extras: ExtraActividades): Observable<ExtraActividades> {
    return this.http.post<ExtraActividades>(this.urlEndPoint_1, extras, {headers: this.httpHeaders})
  }
  getextrasid(id:number):Observable<ExtraActividades> {
    return this.http.get<ExtraActividades>(`${this.urlEndPoint_1}/${id}`)
  }
  deleteExtras(extra_id: number): Observable<ExtraActividades> {
    const url = `http://localhost:8080/api/extrasactividades/eliminarExtraActividad/${extra_id}`; // Ajusta la URL según tu estructura
     return this.http.delete<ExtraActividades>(url);
  }
     updateExtras(extra: ExtraActividades): Observable<ExtraActividades> {
      const url = `http://localhost:8080/api/extrasactividades/actualizarExtraActividad/${extra.extra_id}`;
      console.log('URL de actualización:', url);
      return this.http.put<ExtraActividades>(url, extra);
}

getExtraByName(nombre: string): Observable<ExtraActividades> {
  return this.http.get<ExtraActividades[]>(this.urlEndPoint).pipe(
    map(extras => extras.find(extra => (extra.extra_nombre_proyecto_investigacion+' / '+extra.extra_detalle_hora_gestion_academico) === nombre) as ExtraActividades),
    filter(extra => !!extra) 
  );
}

}

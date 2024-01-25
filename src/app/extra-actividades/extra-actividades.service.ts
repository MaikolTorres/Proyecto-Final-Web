import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtraActividades } from './extra-actividades';

@Injectable({
  providedIn: 'root',
})
export class ExtraActividadesService {

  private urlEndPoint:string = 'http://localhost:8080/api/extrasactividades/listarExtrasActividades';
  private urlEndPoint_1:string = 'http://localhost:8080/api/extrasactividades/guardarExtraActividad';
  private urlEndPoint_2: string = 'http://localhost:8080/api/extrasactividades/eliminarExtraActividad';
  private urlEndPoint_3: string = 'http://localhost:8080/api/extrasactividades/actualizarExtraActividad';
  private urlEndPoint_4: string = 'http://localhost:8080/api/extrasactividades/buscarExtraActividad';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ExtraActividades[]> {
    return this.http.get<ExtraActividades[]>(this.urlEndPoint);
  }

  getById(id: number): Observable<ExtraActividades> {
    return this.http.get<ExtraActividades>(`${this.urlEndPoint_4}/${id}`);
  }

  create(data: ExtraActividades): Observable<ExtraActividades> {
    return this.http.post<ExtraActividades>(this.urlEndPoint_1, data);
  }

  updateExtra(extra: ExtraActividades): Observable<ExtraActividades> {
    const url = `http://localhost:8080/api/extrasactividades/actualizarExtraActividad/${extra.extra_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<ExtraActividades>(this.urlEndPoint_3, extra);
  }
  
  delete(id: number): Observable<ExtraActividades> {
    return this.http.delete<ExtraActividades>(`${this.urlEndPoint_2}/${id}`);
  }
}

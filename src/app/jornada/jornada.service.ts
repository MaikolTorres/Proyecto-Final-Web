import { Injectable } from '@angular/core';
import { Observable, filter, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Jornada } from './jornada';
@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  private urlEndPoint: string = 'http://localhost:8080/api/jornadas/listar';
  private urlEndPoint_1: string = 'http://localhost:8080/api/jornadas/guardar';
  private urlEndPoint_2: string = 'http://localhost:8080/api/jornadas/eliminar'; // Corrige la URL para deleteJornada
  private urlEndPoint_3: string = 'http://localhost:8080/api/jornadas/actualizar'; // Corrige la URL para updateJornada
  private urlEndPoint_4: string = 'http://localhost:8080/api/jornadas/buscar'; // Corrige la URL para getJornadaByName

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.urlEndPoint);
  }

  create(jornada: Jornada): Observable<Jornada> {
    return this.http.post<Jornada>(this.urlEndPoint_1, jornada, { headers: this.httpHeaders });
  }

  getjornadaid(id: number): Observable<Jornada> {
    return this.http.get<Jornada>(`${this.urlEndPoint_1}/${id}`);
  }

  deleteJornada(jornada_id: number): Observable<Jornada> {
    const url = `${this.urlEndPoint_2}/${jornada_id}`;
    return this.http.delete<Jornada>(url);
  }

  updateJornada(jornada: Jornada): Observable<Jornada> {
    const url = `${this.urlEndPoint_3}/${jornada.jornada_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Jornada>(url, jornada);
  }

  comboidjornada(nombre: string): Observable<boolean> {
    return this.getJornadas().pipe(
      map(jornadas => jornadas.some(jornada => jornada.jornada_nombre === nombre))
    );
  }

  getJornadaById(id: any): Observable<Jornada> {
    return this.http.get<Jornada>(`${this.urlEndPoint_1}/${id}`);
  }

  getJornadaByName(nombre: string): Observable<Jornada> {
    return this.http.get<Jornada[]>(this.urlEndPoint).pipe(
      map(jornadas => jornadas.find(jornada => jornada.jornada_nombre === nombre) as Jornada),
      filter(jornada => !!jornada)
    );
  }
}
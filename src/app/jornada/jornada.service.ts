import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Jornada } from './jornada';

@Injectable({
  providedIn: 'root'
})

export class JornadaService {
  [x: string]: any;


  private urlEndPoint: string = 'http://localhost:8080/api/jornadas/listar'
  private urlEndPoint_1: string = 'http://localhost:8080/api/jornadas/guardar'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getJornadas(): Observable<Jornada[]> {

    return this.http.get<Jornada[]>(this.urlEndPoint);
  }

  create(jornada: Jornada): Observable<Jornada> {
    return this.http.post<Jornada>(this.urlEndPoint_1, jornada, { headers: this.httpHeaders })
  }

  getjornadaid(id: number): Observable<Jornada> {
    return this.http.get<Jornada>(`${this.urlEndPoint_1}/${id}`)
  }

  //   deleteCliente(id: number): Observable<Cliente> {
  //     return this.http.delete<Cliente>(`${this.urlEndPoint_2}/${id}`);
  //   }

  deleteJornada(jornada_id: number): Observable<Jornada> {
    const url = `http://localhost:8080/api/jornadas/eliminar/${jornada_id}`; // Ajusta la URL según tu estructura
    return this.http.delete<Jornada>(url);
  }


  updateJornada(jornada: Jornada): Observable<Jornada> {
    const url = `http://localhost:8080/api/jornadas/actualizar/${jornada.jornada_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Jornada>(url, jornada);
  }
  ///


}

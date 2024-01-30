import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrera } from './carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  private urlEndPoint = 'http://localhost:8080/api/carrera/listarCarreras';
  private urlGuardarCarrera = 'http://localhost:8080/api/carrera/guardarCarrera';
  private urlBuscarCarrera = 'http://localhost:8080/api/carrera/buscarCarrera';
  private urlEliminarCarrera = 'http://localhost:8080/api/carrera/eliminarCarrera';

  constructor(private http: HttpClient) { }

  getCarrera(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlEndPoint);
  }

  getCarreraId(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.urlBuscarCarrera}/${id}`);
  }

  createCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.urlGuardarCarrera, carrera);
  }

  updateCarrera(carrera: Carrera): Observable<Carrera> {
    const url = `${this.urlGuardarCarrera}/${carrera.carrera_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Carrera>(url, carrera);
  }

  delete(id: number): Observable<Carrera> {
    return this.http.delete<Carrera>(`${this.urlEliminarCarrera}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
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


  comboidcarrera(nombre: string): Observable<boolean> {
    return this.getCarrera().pipe(
      map(carreras => carreras.some(carrera => carrera.carrera_nombre=== nombre))
    );
  }
  getCcById(id: any): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.urlGuardarCarrera}/${id}`)
  }
  getCcByName(nombre: string): Observable<Carrera> {
    return this.http.get<Carrera[]>(this.urlEndPoint).pipe(
      map(carreras => carreras.find(carrera => carrera.carrera_nombre === nombre) as Carrera), 
      filter(carrera => !!carrera) // Filtrar null o undefined
    );
  }
}

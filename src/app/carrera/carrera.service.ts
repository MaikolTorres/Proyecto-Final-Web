import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carrera } from './carrera';


@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  [x: string]: any;

  private urlEndPoint:string = 'http://localhost:8080/api/carrera/listarCarreras';
  private urlEndPoint_1:string = 'http://localhost:8080/api/carrera/guardarCarreras';
  private urlEndPoint_2:string = 'http://localhost:8080/api/carrera/eliminarCarrera';
  private urlEndPoint_3:string = 'http://localhost:8080/api/carrera/actualizarCarrera';
  private urlEndPoint_4:string = 'http://localhost:8080/api/carrera/buscarCarrera';

  constructor(private http: HttpClient) { }

  getCarrera(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlEndPoint);
  }

  getCarreraId(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.urlEndPoint_4}/${id}`);
  }

  createCarrera(data: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.urlEndPoint_1, data);
  }

  updateCarrea(carrera: Carrera): Observable<Carrera> {
    const url = `http://localhost:8080/api/carrera/actualizarCarrera/${carrera.carrera_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Carrera>(this.urlEndPoint_3, carrera);
  }

  delete(id: number): Observable<Carrera> {
    return this.http.delete<Carrera>(`${this.urlEndPoint_2}/${id}`);
  }
}

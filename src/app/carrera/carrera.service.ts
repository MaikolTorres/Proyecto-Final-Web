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
  private urlEndPoint_4:string = 'http://localhost:8080/api/carrera/buscarCarrera';

  constructor(private http: HttpClient) { }

  getCarrera(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlEndPoint);
  }

  getCarreraId(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.urlEndPoint_4}/${id}`);
  }

  createCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.urlEndPoint_1, carrera);
  }

  updateCarrea(carrera: Carrera): Observable<Carrera> {
    const url = `http://localhost:8080/api/carrera/actualizarCarrera/${carrera.carrera_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Carrera>(url, carrera);
  }

  delete(carrera_id: number): Observable<Carrera> {
    const url = `http://localhost:8080/api/carrera/eliminar/${carrera_id}`; // Ajusta la URL según tu estructura
    return this.http.delete<Carrera>(url);
  }
}

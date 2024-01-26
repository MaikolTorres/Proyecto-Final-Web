import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodos } from './periodo';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  private urlEndPoint:string = 'http://localhost:8080/api/periodos/listar';
  private urlEndPoint_1:string = 'http://localhost:8080/api/periodos/guardar';
  private urlEndPoint_2:string = 'http://localhost:8080/api/periodos/eliminar';
  private urlEndPoint_3:string = 'http://localhost:8080/api/periodos/actualizar';
  private urlEndPoint_4:string = 'http://localhost:8080/api/periodos/buscar';

  constructor(private http: HttpClient) { }

  getPeriodo(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.urlEndPoint);
  }

  getPeriodoById(id: number): Observable<Periodos> {
    return this.http.get<Periodos>(`${this.urlEndPoint_4}/${id}`);
  }

  createPeriodo(data: Periodos): Observable<Periodos> {
    return this.http.post<Periodos>(this.urlEndPoint_1, data);
  }

  updatePeriodo(periodo: Periodos): Observable<Periodos> {
    const url = `http://localhost:8080/api/periodos/actualizar/${periodo.periodo_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Periodos>(this.urlEndPoint_3, periodo);
  }
  
  delete(id: number): Observable<Periodos> {
    return this.http.delete<Periodos>(`${this.urlEndPoint_2}/${id}`);
  }

}

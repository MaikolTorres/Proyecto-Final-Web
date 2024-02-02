import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { Periodos } from './periodo';
import { Titulo } from '../titulo/titulo';

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

  getjjById(id: any): Observable<Periodos> {
    return this.http.get<Periodos>(`${this.urlEndPoint_1}/${id}`)
  }
  
  getjjByName(nombre: String): Observable<Periodos> {
    return this.http.get<Periodos[]>(this.urlEndPoint).pipe(
      map(periodos => periodos.find(periodo => periodo.periodo_mes_inicio === nombre) as Periodos), 
      filter(periodo => !!periodo) // Filtrar null o undefined
    );
  }

  comboidperiodo(nombre: string): Observable<boolean> {
    return this.getPeriodo().pipe(
      map(periodos => periodos.some(periodo => 
        (periodo.periodo_mes_inicio + ' ' + periodo.periodo_anio_inicio + '-' +
         periodo.periodo_mes_fin + ' ' + periodo.periodo_anio_fin) === nombre
      ))
    );
  }
  
 
  getperiodoByName(nombre: string): Observable<Periodos> {
    return this.http.get<Periodos[]>(this.urlEndPoint).pipe(
      map(Periodos => Periodos.find(periodo =>  (periodo.periodo_mes_inicio + ' ' + periodo.periodo_anio_inicio + '-' +
      periodo.periodo_mes_fin + ' ' + periodo.periodo_anio_fin) === nombre) as Periodos), 
      filter(periodo => !!periodo) // Filtrar null o undefined
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Titulo } from './titulo';

  
@Injectable({
  providedIn: 'root'
})
export class TituloService {

  [x: string]: any;
  private urlcat = 'http://localhost:8080/categorias';
  private urlEndPoint:string = 'http://localhost:8080/api/titulo/listar'
  private urlEndPoint_1:string = 'http://localhost:8080/api/titulo/guardar'
  private urlEndPoint_2:string = 'http://localhost:8080/api/titulo/eliminar/{{id}}'
  private urlEndPoint_3:string = 'http://localhost:8080/api/titulo/actualizar/{{id}}'
  private urlEndPoint_4:string = 'http://localhost:8080/api/titulo/buscar/{{id}}'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
  
  constructor(private http:HttpClient) {}

  getTitulos(): Observable<Titulo[]> {
   
    return this.http.get<Titulo[]>(this.urlEndPoint);
  }
  create(titulos: Titulo): Observable<Titulo> {
    return this.http.post<Titulo>(this.urlEndPoint_1, titulos, {headers: this.httpHeaders})
  }
  gettilulosid(id:number):Observable<Titulo> {
    return this.http.get<Titulo>(`${this.urlEndPoint_1}/${id}`)
  }
  deletetitulo(titulo_id: number): Observable<Titulo> {
    const url = `http://localhost:8080/api/titulo/eliminar/${titulo_id}`; // Ajusta la URL según tu estructura
     return this.http.delete<Titulo>(url);
  }
  updatetitulos(titulo: Titulo): Observable<Titulo> {
    const url = `http://localhost:8080/api/titulo/actualizar/${titulo.titulo_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Titulo>(url, titulo); // Aquí cambié `Titulo` por `titulo`
  }
}

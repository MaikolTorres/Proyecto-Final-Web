import { Injectable } from '@angular/core';
import { Observable, filter, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GradoOcupacional } from './grado-ocupacional';

@Injectable({
  providedIn: 'root'
})
export class GradoOcupacionalService {
  [x: string]: any;

  private urlEndPoint:string = 'http://localhost:8080/api/grado/listar'
  private urlEndPoint_1:string = 'http://localhost:8080/api/grado/guardar'
  private urlEndPoint_2:string = 'http://localhost:8080/api/grado/eliminar/{{id}}'
  private urlEndPoint_3:string = 'http://localhost:8080/api/grado/actualizar/{{id}}'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
constructor(private http:HttpClient) {}
getGrados(): Observable<GradoOcupacional[]> {
   
  return this.http.get<GradoOcupacional[]>(this.urlEndPoint);
}

create(grado: GradoOcupacional): Observable<GradoOcupacional> {
  return this.http.post<GradoOcupacional>(this.urlEndPoint_1, grado, {headers: this.httpHeaders})
}

getgradoid(id:number):Observable<GradoOcupacional> {
  return this.http.get<GradoOcupacional>(`${this.urlEndPoint_1}/${id}`)
}


deleteGrado(grado_id: number): Observable<GradoOcupacional> {
  const url = `http://localhost:8080/api/grado/eliminar/${grado_id}`; // Ajusta la URL según tu estructura
   return this.http.delete<GradoOcupacional>(url);
}

updateGrado(grado: GradoOcupacional): Observable<GradoOcupacional> {
  const url = `http://localhost:8080/api/grado/actualizar/${grado.grado_id}`;
  console.log('URL de actualización:', url);
  return this.http.put<GradoOcupacional>(url, grado);
}
comboidgrado(nombre: string): Observable<boolean> {
  return this.getGrados().pipe(
    map(grados => grados.some(grado => grado.grado_titulo === nombre))
  );
}

getGradoByName(nombre: string): Observable<GradoOcupacional> {
  return this.http.get<GradoOcupacional[]>(this.urlEndPoint).pipe(
    map(grados => grados.find(grado => grado.grado_titulo === nombre) as GradoOcupacional), 
    filter(grado => !!grado) // Filtrar null o undefined
  );
}
}

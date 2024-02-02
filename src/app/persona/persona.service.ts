import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from './persona';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  getPersonas() {
    throw new Error('Method not implemented.');
  }

  private urlEndPoint: string = 'http://localhost:8080/api/personas/listar'
  private urlEndPoint_1: string = 'http://localhost:8080/api/personas/guardar'


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getPersona(): Observable<Persona[]> {

    return this.http.get<Persona[]>(this.urlEndPoint);
  }

  create(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.urlEndPoint_1, persona, { headers: this.httpHeaders })
  }

  getpersonaid(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.urlEndPoint_1}/${id}`)
  }

  //   deleteCliente(id: number): Observable<Cliente> {
  //     return this.http.delete<Cliente>(`${this.urlEndPoint_2}/${id}`);
  //   }

  deletePersona(per_id: number): Observable<Persona> {
    const url = `http://localhost:8080/api/personas/eliminar/${per_id}`; // Ajusta la URL según tu estructura
    return this.http.delete<Persona>(url);
  }


  updatePersona(persona: Persona): Observable<Persona> {
    const url = `http://localhost:8080/api/personas/actualizar/${persona.per_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Persona>(url, persona);
  }
  ///
  getbypersona(cedula: string): Observable<Persona> {
    return this.http.get<Persona[]>(this.urlEndPoint).pipe(
      map(personas => personas.find(persona => persona.per_cedula === cedula) as Persona),
      filter(persona => !!persona) // Filtrar null o undefined
    );
  }
  comboidpersona(nombre: string): Observable<boolean> {
    return this.getPersona().pipe(
      map(personas => personas.some(persona => persona.per_cedula === nombre))
    );
  }
  getprsonaByName(nombre: string): Observable<Persona> {
    return this.getPersona().pipe(
      map(personas => personas.find(persona => persona.per_cedula === nombre) as Persona),
    );
    //
  }



}

import { Injectable } from '@angular/core';
import { Persona } from '../persona/persona';
import { TipoContrato } from '../tipo-contrato/tipo-contrato';
import { Cargo } from '../cargo/cargo';
import { Titulo } from '../titulo/titulo';
import { Periodos } from '../periodos/periodo';
import { Docente } from './docente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, filter, map } from 'rxjs';
import { GradoOcupacional } from '../grado-ocupacional/grado-ocupacional';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private urlEndPoint: string = 'http://localhost:8080/api/docente/listar';
  private urlEndPoint_1: string = 'http://localhost:8080/api/docente/guardar';
  private urlpersona: string = 'http://localhost:8080/api/personas/listar';
  private urlcontrato: string = 'http://localhost:8080/api/tipocontratos/listar';
  private urlcargo: string = 'http://localhost:8080/api/cargo/listar';
  private urltitulo: string = 'http://localhost:8080/api/titulo/listar';
  private urlGrado: string = 'http://localhost:8080/api/grado/listar';
  private urlperiodo: string = 'http://localhost:8080/api/periodos/listar';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  create(docente: Docente): Observable<Docente> {
    console.log('Datos que se enviarán al backend:', docente);
    return this.http.post<Docente>(this.urlEndPoint_1, docente, { headers: this.httpHeaders }).pipe(
      catchError(error => {
        console.error('Error en la petición HTTP:', error);
        throw error;  // Puedes personalizar esto según tus necesidades
      })
    );
  }
  deleteDocente(docente_id: number): Observable<Docente> {
    const url = `http://localhost:8080/api/docente/eliminar/${docente_id}`;
    return this.http.delete<Docente>(url);
  }

  updateDocente(docente: Docente): Observable<Docente> {
    const url = `http://localhost:8080/api/docente/actualizar/${docente.docente_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Docente>(url, docente);
  }

  getDocenteById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.urlEndPoint_1}/${id}`);
  }
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.urlEndPoint);
  }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.urlpersona);
  }

  getTipoContratos(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>(this.urlcontrato);
  }

  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.urlcargo);
  }

  getTitulos(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(this.urltitulo);
  }

  getPeriodos(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.urlperiodo);
  }

  getGrados(): Observable<GradoOcupacional[]> {
    return this.http.get<GradoOcupacional[]>(this.urlGrado);
  }

  getDocentesByName(nombre: string): Observable<Docente> {
    return this.http.get<Docente[]>(this.urlEndPoint).pipe(
      map(docentes => docentes.find(docente =>( docente.persona.per_primer_nombre+ ' ' +
      docente.persona.per_apellido_paterno) === nombre) as Docente),
      filter(docente => !!docente) // Filtrar null o undefined
    );
  }

}
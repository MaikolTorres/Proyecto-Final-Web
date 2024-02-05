import { Injectable } from '@angular/core';
import { Docente } from '../docente/docente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { ActividadesNoDocente } from './actividades-no-docente';

@Injectable({
  providedIn: 'root',
})
export class ActividadNoDocenteService {
  docente: Docente[] = [];

  //:Curso[]=[];

  constructor(private http: HttpClient) {}

  private urlEndPoint: string =
    'http://localhost:8080/api/actividades-no-docentes/listarActividadesNoDocentes';

  private urlEndPoint_1: string =
    'http://localhost:8080/api/actividades-no-docentes/guardarActividadNoDocente';

  //cdocentes
  private urlDocente: string = 'http://localhost:8080/docente/listar';
  private urlDocente1: string = 'http://localhost:8080/api/docente/listar';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  get(): Observable<ActividadesNoDocente[]> {
    return this.http.get<ActividadesNoDocente[]>(this.urlEndPoint);
  }

  create(asignatura: ActividadesNoDocente): Observable<ActividadesNoDocente> {
    return this.http.post<ActividadesNoDocente>(
      this.urlEndPoint_1,
      asignatura,
      { headers: this.httpHeaders }
    );
  }

  getactNoDocenteId(id: number): Observable<ActividadesNoDocente> {
    return this.http.get<ActividadesNoDocente>(`${this.urlEndPoint_1}/${id}`);
  }

  //   deleteCliente(id: number): Observable<Cliente> {
  //     return this.http.delete<Cliente>(`${this.urlEndPoint_2}/${id}`);
  //   }

  deleteA(id: number): Observable<ActividadesNoDocente> {
    const url = `http://localhost:8080/api/actividades-no-docentes/eliminarActividadNoDocente/${id}`; // Ajusta la URL según tu estructura
    return this.http.delete<ActividadesNoDocente>(url);
  }

  updateAsignatura(
    actN: ActividadesNoDocente
  ): Observable<ActividadesNoDocente> {
    const url = `http://localhost:8080/api/actividades-no-docentes/actualizarActividadNoDocente/${actN.activinodoc_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<ActividadesNoDocente>(url, actN);
  }

  //docente
  getdoccente(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.urlDocente1);
  }
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.urlDocente);
  }

  cargarDocentes() {
    this.getdoccente().subscribe((doc) => (this.docente = doc));
  }

  getActNoDocenteByName(nombre: string): Observable<ActividadesNoDocente> {
    return this.http.get<ActividadesNoDocente[]>(this.urlEndPoint).pipe(
      map(
        (actNo) =>
          actNo.find(
            (actNoDoc) => actNoDoc.activinodoc_nombre === nombre
          ) as ActividadesNoDocente
      ),
      filter((actNoDoc) => !!actNoDoc) // Filtrar null o undefined
    );
  }
}

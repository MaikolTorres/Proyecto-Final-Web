import { Injectable } from '@angular/core';
import { Carrera } from '../carrera/carrera';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private urlEndPoint: string = 'http://localhost:8080/api/curso/listar';
  private urlEndPoint_1: string = 'http://localhost:8080/api/curso/guardar';
  private urlCARRERA: string = 'http://localhost:8080/carrera';
  private urlJornada: string = 'http://localhost:8080/jornadas';
 
  cursos:Curso[]=[];
  
  constructor(private http: HttpClient) { }

  getCurso(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.urlEndPoint);
  }

  getCursoid(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.urlEndPoint_1}/${id}`);
  }

  deleteCurso(curso_id: number): Observable<Curso> {
    const url = `http://localhost:8080/api/curso/eliminar/${curso_id}`;
    return this.http.delete<Curso>(url);
  }

  updateCurso(curso: Curso): Observable<Curso> {
    const url = `http://localhost:8080/api/curso/actualizar/${curso.curso_id}`;
    return this.http.put<Curso>(url, Curso);
  }

  // Obtener personas para cargar en el select
  getCarrera(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.urlCARRERA);
  }

  // Cargar personas al inicializar el componente
  cargarPersonas() {
    this.getCurso().subscribe(cursos => this.cursos = cursos);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Curso } from './curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  [x: string]: any;
  
  cursos:Curso[]=[];
  
  constructor(private http: HttpClient) { }

    private urlEndPoint:string = 'http://localhost:8080/api/curso/listarCurso'
    private urlEndPoint_1:string = 'http://localhost:8080/api/curso/guardarCurso'
    private urlEndPoint_2:string = 'http://localhost:8080/api/curso/eliminarCurso/{{id}}'
    private urlEndPoint_3:string = 'http://localhost:8080/api/curso/actualizar/{{id}}'
    private urlEndPoint_4:string = 'http://localhost:8080/api/curso/buscarUsuario/{{id}}'
  
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    
  
      get(): Observable<Curso[]> {
   
        return this.http.get<Curso[]>(this.urlEndPoint);
      }
  
      create(curso: Curso): Observable<Curso> {
        return this.http.post<Curso>(this.urlEndPoint_1, curso, {headers: this.httpHeaders})
      }
  
      getcursoId(id:number):Observable<Curso> {
        return this.http.get<Curso>(`${this.urlEndPoint_1}/${id}`)
      }
  
   //   deleteCliente(id: number): Observable<Cliente> {
   //     return this.http.delete<Cliente>(`${this.urlEndPoint_2}/${id}`);
   //   }
   
    deleteCurso(curso_id: number): Observable<Curso> {
          const url = `http://localhost:8080/api/curso/eliminarCurso/${curso_id}`; // Ajusta la URL según tu estructura
           return this.http.delete<Curso>(url);
    }
  

 updateCurso(curso: Curso): Observable<Curso> {
  const url = `http://localhost:8080/api/curso/actualizar/${curso.curso_id}`;
  console.log('URL de actualización:', url);
  return this.http.put<Curso>(url, curso);
}


}

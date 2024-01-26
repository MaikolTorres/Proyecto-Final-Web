import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Curso } from './curso';
import { Observable } from 'rxjs';
import { Carrera } from '../carrera/carrera';
import { Periodos } from '../periodos/periodo';
import { Jornada } from '../jornada/jornada';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  carrera: Carrera[] = [];
  periodo: Periodos[] = [];
  jornada: Jornada[] = [];
  
  //:Curso[]=[];


  
  constructor(private http: HttpClient) { }


  private urlEndPointttt:string = 'http://localhost:8080/api/curso'
    private urlEndPoint:string = 'http://localhost:8080/api/curso/listarCurso'
    private urlEndPoint_1:string = 'http://localhost:8080/api/curso/guardarCurso'
    private urlEndPoint_3:string = 'http://localhost:8080/api/curso/actualizar/{{id}}'
    private urlEndPoint_4:string = 'http://localhost:8080/api/curso/buscarUsuario/{{id}}'
    private urlCarrera: string = 'http://localhost:8080/carrera/listar';
    private urlCarrera1: string = 'http://localhost:8080/api/carrera/listarCarreras';



//Period
private urlPeriodo: string = 'http://localhost:8080/periodos/listar';
    private urlPeriodo1: string = 'http://localhost:8080/api/periodos/listar';
//Jorndaa
private urlJornada: string = 'http://localhost:8080/jornadas/listar';
    private urlJornada1: string = 'http://localhost:8080/api/jornadas/listar';

    private apiUrl = 'http://localhost:8080/api/carrera';
    private apiUrl2 = 'http://localhost:8080/api/jornadas';
    private apiUrl3 = 'http://localhost:8080/api/periodos';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    
  
      get(): Observable<Curso[]> {
   
        return this.http.get<Curso[]>(this.urlEndPoint);
      }

      create(curso: Curso): Observable<Curso> {
        console.log('Intentando crear curso:', curso);
        return this.http.post<Curso>(this.urlEndPoint_1, curso, { headers: this.httpHeaders })
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


//carrerass
getcarrer(): Observable<Carrera[]> {
  return this.http.get<Carrera[]>(this.urlCarrera1);
}
getCarreras(): Observable<Carrera[]> {
  return this.http.get<Carrera[]>(this.urlCarrera);
}

cargarCarreras() {
  this.getcarrer().subscribe(carrera => this.carrera = carrera);
}


//periodoss
getperiodd(): Observable<Periodos[]> {
  return this.http.get<Periodos[]>(this.urlPeriodo1);
}
getPeriodos(): Observable<Periodos[]> {
  return this.http.get<Periodos[]>(this.urlPeriodo);
}

cargarPeriodos() {
  this.getperiodd().subscribe(periodo => this.periodo = periodo);
}



//jornadas
getjornss(): Observable<Jornada[]> {
  return this.http.get<Jornada[]>(this.urlJornada1);
}
getJornadas(): Observable<Jornada[]> {
  return this.http.get<Jornada[]>(this.urlJornada);
}

cargarJornadas() {
  this.getjornss().subscribe(jornada => this.jornada = jornada);
}



getJornadaIdByNombre(nombre: string): Observable<number> {
  return this.http.get<number>(`${this.urlEndPoint}/jornada/id/${nombre}`);
}



getCarreraIdByNombre(nombre: string): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/buscarCarreraIdPorNombre/${nombre}`);
}

}

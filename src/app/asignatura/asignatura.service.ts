import { Injectable } from '@angular/core';
import { Curso } from '../listar-curso/curso';
import { Docente } from '../docente/docente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';
import { Asignatura } from './asignatura';

//const express = require('express');
//const Joi = require('joi');
//const app = express();
//const cors=require('cors');

//app.use(express.json());
///app.use(cors());

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

 
  curso: Curso[] = [];
  docente: Docente[] = [];
  
  //:Curso[]=[];


  
  constructor(private http: HttpClient) { }

    private urlEndPoint:string = 'http://localhost:8080/api/asignatura/listarAsignatura'

    private urlEndPoint_1:string = 'http://localhost:8080/api/asignatura/guardarAsignatura'
    private urlEndPoint_3:string = 'http://localhost:8080/api/asignatura/actualizarAsignatura/{{id}}'
    private urlEndPoint_4:string = 'http://localhost:8080/api/asignatura/buscarUsuario/{{id}}'


    //curso
    private urlCurso: string = 'http://localhost:8080/curso/listarCurso';
    private urlCurso1: string = 'http://localhost:8080/api/curso/listarCurso';


 //cdocentes
 private urlDocente: string = 'http://localhost:8080/docente/listar';
 private urlDocente1: string = 'http://localhost:8080/api/docente/listar';



    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    
  
      get(): Observable<Asignatura[]> {
   
        return this.http.get<Asignatura[]>(this.urlEndPoint);
      }

      create(asignatura: Asignatura): Observable<Asignatura> {
        return this.http.post<Asignatura>(this.urlEndPoint_1, asignatura, { headers: this.httpHeaders })
      }
  
      getasignaturaId(id:number):Observable<Asignatura> {
        return this.http.get<Asignatura>(`${this.urlEndPoint_1}/${id}`)
      }
  
   //   deleteCliente(id: number): Observable<Cliente> {
   //     return this.http.delete<Cliente>(`${this.urlEndPoint_2}/${id}`);
   //   }
   
    deleteA(asignatura_id: number): Observable<Asignatura> {
          const url = `http://localhost:8080/api/asignatura/eliminarAsignatura/${asignatura_id}`; // Ajusta la URL según tu estructura
           return this.http.delete<Asignatura>(url);
    }
  

 updateAsignatura(asig: Asignatura): Observable<Asignatura> {
  const url = `http://localhost:8080/api/asignatura/actualizarAsignatura/${asig.asignatura_id}`;
  console.log('URL de actualización:', url);
  return this.http.put<Asignatura>(url, asig);
}


//carrerass
getcursss(): Observable<Curso[]> {
  return this.http.get<Curso[]>(this.urlCurso1);
}
getCursos(): Observable<Curso[]> {
  return this.http.get<Curso[]>(this.urlCurso);
}

cargarCursos() {
  this.getcursss().subscribe(curso => this.curso = curso);
}


//periodoss
getdoccente(): Observable<Docente[]> {
  return this.http.get<Docente[]>(this.urlDocente1);
}
getDocentes(): Observable<Docente[]> {
  return this.http.get<Docente[]>(this.urlDocente);
}

cargarDocentes() {
  this.getdoccente().subscribe(doc => this.docente = doc);
}


getAsignaturaByName(nombre: string): Observable<Asignatura> {
  return this.http.get<Asignatura[]>(this.urlEndPoint).pipe(
    map(asignaturas => asignaturas.find(asignatura => asignatura.asignatura_nombre === nombre) as Asignatura),
    filter(asignatura => !!asignatura) // Filtrar null o undefined
  );
}

}

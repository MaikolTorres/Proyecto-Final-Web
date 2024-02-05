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
  persona: Persona[] = [];
tipocontrato:TipoContrato[] = [];
cargo:Cargo[] = [];
titulo:Titulo[] = [];
periodo:Periodos[] = [];
grado:GradoOcupacional[] = [];
 

  constructor(private http: HttpClient) { }

  private urlEndPoint: string = 'http://localhost:8080/api/docente/listar';
  private urlEndPoint_1: string = 'http://localhost:8080/api/docente/guardar';
  private urlEndPoint_3:string = 'http://localhost:8080/api/docente/actualizar/{{id}}'
  private urlEndPoint_4:string = 'http://localhost:8080/api/docente/buscar/{{id}}'
//persona
  private urlpersona: string = 'http://localhost:8080/api/personas/listar';
  private urlpersona1: string = 'http://localhost:8080/personas/listar';
//contrato  
private urlcontrato: string = 'http://localhost:8080/api/tipocontratos/listar';
private urlcontrato1: string = 'http://localhost:8080/tipocontratos/listar';
//cargo
private urlcargo: string = 'http://localhost:8080/api/cargo/listar';
private urlcargo1: string = 'http://localhost:8080/cargo/listar';
//titulo
private urltitulo: string = 'http://localhost:8080/api/titulo/listar';
private urltitulo1: string = 'http://localhost:8080/titulo/listar';
//grado
  private urlGrado: string = 'http://localhost:8080/api/grado/listar';
  private urlGrado1: string = 'http://localhost:8080/grado/listar';
//periodo
  private urlperiodo: string = 'http://localhost:8080/api/periodos/listar';
  private urlperiodo1: string = 'http://localhost:8080/periodos/listar';


  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  get(): Observable<Docente[]> {
   
    return this.http.get<Docente[]>(this.urlEndPoint);
  }

  
  create(docente: Docente): Observable<Docente> {
    console.log('Datos que se enviarán al backend:', docente);
    return this.http.post<Docente>(this.urlEndPoint_1, docente, { headers: this.httpHeaders })
     
    ;
  }
  getdocenteId(id:number):Observable<Docente> {
    return this.http.get<Docente>(`${this.urlEndPoint_1}/${id}`)
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
//personas
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.urlpersona);
  }
  getPersonass(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.urlpersona1);
  }
  cargarPersonas() {
    this.getPersonass().subscribe(persona => this.persona = persona);
  }
  //contratos
  getTipoContratosa(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>(this.urlcontrato1);
  }
  getTipoContratos(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>(this.urlcontrato);
  }
  cargarcontratos() {
    this.getTipoContratosa().subscribe(contrato => this.tipocontrato = contrato);
  }
///////////cargos
  getCargoss(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.urlcargo1);
  }
  getCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.urlcargo);
  }
  cargarcargos() {
    this.getCargoss().subscribe(cargos => this.cargo = cargos);
  }
///titulos
  getTituloss(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(this.urltitulo1);
  }
  getTitulos(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(this.urltitulo);
  }
  cargartitulos() {
    this.getTituloss().subscribe(titulo => this.titulo = titulo);
  }
//periodos
  getPeriodoss(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.urlperiodo1);
  }
  getPeriodos(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.urlperiodo);
  }
  cargarperiodos() {
    this.getPeriodoss().subscribe(periodo => this.periodo = periodo);
  }
//grados
  getGradoss(): Observable<GradoOcupacional[]> {
    return this.http.get<GradoOcupacional[]>(this.urlGrado1);
  }
  getGrados(): Observable<GradoOcupacional[]> {
    return this.http.get<GradoOcupacional[]>(this.urlGrado);
  }
  cargargrados() {
    this.getGradoss().subscribe(grado => this.grado = grado);
  }
  getDocentesByName(nombre: string): Observable<Docente> {
    return this.http.get<Docente[]>(this.urlEndPoint).pipe(
      map(docentes => docentes.find(docente =>( docente.persona.per_primer_nombre+ ' ' +
      docente.persona.per_apellido_paterno) === nombre) as Docente),
      filter(docente => !!docente) // Filtrar null o undefined
    );
  }

}
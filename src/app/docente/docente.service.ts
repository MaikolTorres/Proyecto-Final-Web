import { Injectable } from '@angular/core';
import { Persona } from '../persona/persona';
import { TipoContrato } from '../tipo-contrato/tipo-contrato';
import { Cargo } from '../cargo/cargo';
import { Titulo } from '../titulo/titulo';
import { Periodos } from '../periodos/periodo';
import { Docente } from './docente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
 docentes: Docente[] = [];
  personas: Persona[] = [];
contratos: TipoContrato[] = [];
cargos: Cargo[] = [];
titulos: Titulo[] = [];
periodos: Periodos[] = [];
grados:GradoOcupacional[]=[];
private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});


constructor(private http: HttpClient) { }
getDocentes(): Observable<Docente[]> {
  return this.http.get<Docente[]>(this.urlEndPoint);
}
create(docentes: Docente): Observable<Docente> {
  return this.http.post<Docente>(this.urlEndPoint_1, docentes, {headers: this.httpHeaders})
}
getdocentesId(id:number):Observable<Docente> {
  return this.http.get<Docente>(`${this.urlEndPoint_1}/${id}`)
}
deleteDocente(docente_id: number): Observable<Docente> {
  const url = `http://localhost:8080/api/docente/eliminar/${docente_id}`; // Ajusta la URL según tu estructura
   return this.http.delete<Docente>(url);
}
   updatedocente(docente: Docente): Observable<Docente> {
    const url = `http://localhost:8080/api/docente/actualizar/${docente.docente_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Docente>(url, Docente);
   }
   getpers(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.urlpersona);
  }
  getcontrato(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>(this.urlcontrato);
  }
  getcargo(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.urlcargo);
  }
  gettitulo(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(this.urltitulo);
  }
  getperiodos(): Observable<Periodos[]> {
    return this.http.get<Periodos[]>(this.urlperiodo);
  }
  getgrado(): Observable<GradoOcupacional[]> {
    return this.http.get<GradoOcupacional[]>(this.urlGrado);
  }
  cargarPersonas() {
    this.getpers().subscribe(personas => this.personas = personas);
  }
  cargarcontrato() {
    this.getcontrato().subscribe(contratos1 => this.contratos = contratos1);
  }
  cargarCargo() {
    this.getcargo().subscribe(cargos => this.cargos = cargos);
  }
  cargarTitulos() {
    this.gettitulo().subscribe(titulos => this.titulos = titulos);
  }
  cargarPeriodos() {
    this.getperiodos().subscribe(periodos => this.periodos = periodos);
  }
  cargarGrados() {
    this.getgrado().subscribe(grados => this.grados = grados);
  }
}

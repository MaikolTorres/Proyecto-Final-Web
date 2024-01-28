import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './Usuario';
import { Persona } from '../persona/persona';
import { Rol } from '../roles/roles';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuario/listar';
  private urlEndPoint_1: string = 'http://localhost:8080/api/usuario/guardar';
  private urlPersonas: string = 'http://localhost:8080/personas/listar';
  private urlEndPoint_2: string = 'http://localhost:8080/api/personas/listar';
  private urlEndPoint_3: string = 'http://localhost:8080/api/roles/listar';
  
  roles: Rol[] = [];
  personas: Persona[] = [];
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlEndPoint);
  }
  create(usuarios: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlEndPoint_1, usuarios, {headers: this.httpHeaders})
  }
  getusuariosId(id:number):Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint_1}/${id}`)
  }
  deleteusuario(usuario_id: number): Observable<Usuario> {
    const url = `http://localhost:8080/api/usuario/eliminar/${usuario_id}`; // Ajusta la URL según tu estructura
     return this.http.delete<Usuario>(url);
  }
     updateUsuario(usuario: Usuario): Observable<Usuario> {
      const url = `http://localhost:8080/api/usuario/actualizar/${usuario.usu_id}`;
      console.log('URL de actualización:', url);
      return this.http.put<Usuario>(url, Usuario);
}
  getpers(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.urlEndPoint_2);
  }

  getrol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.urlEndPoint_3);
  }

  getUsuarioid(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint_1}/${id}`);
  }

  deleteUsuario(usu_id: number): Observable<Usuario> {
    const url = `http://localhost:8080/api/usuario/eliminar/${usu_id}`;
    return this.http.delete<Usuario>(url);
  }

  // Obtener personas para cargar en el select
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.urlPersonas);
  }
  // Cargar personas al inicializar el componente
  cargarPersonas() {
    this.getpers().subscribe(personas => this.personas = personas);
  }

  cargarRoles() {
    this.getrol().subscribe(roles => this.roles = roles);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rol } from './roles';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  [x: string]: any;
  private urlcat = 'http://localhost:8080/categorias';
  private urlEndPoint: string = 'http://localhost:8080/api/roles/listar'
  private urlEndPoint_1: string = 'http://localhost:8080/api/roles/guardar'
  private urlEndPoint_2: string = 'http://localhost:8080/api/roles/eliminar/{{id}}'
  private urlEndPoint_3: string = 'http://localhost:8080/api/roles/actualizar/{{id}}'
  private urlEndPoint_4: string = 'http://localhost:8080/api/roles/buscar/{{id}}'

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  getRoles(): Observable<Rol[]> {

    return this.http.get<Rol[]>(this.urlEndPoint);
  }
  create(roles: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.urlEndPoint_1, roles, { headers: this.httpHeaders })
  }
  getrolesid(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.urlEndPoint_1}/${id}`)
  }
  deleteRol(rol_id: number): Observable<Rol> {
    const url = `http://localhost:8080/api/roles/eliminar/${rol_id}`; // Ajusta la URL según tu estructura
    return this.http.delete<Rol>(url);
  }
  updateRoles(rol: Rol): Observable<Rol> {
    const url = `http://localhost:8080/api/roles/actualizar/${rol.rol_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Rol>(url, rol);
  }
  comboidrol(nombre: string): Observable<boolean> {
    return this.getRoles().pipe(
      map(roles => roles.some(rol => rol.rol_nombre === nombre))
    );
  }
 
  getRolByName(nombre: string): Observable<Rol> {
    return this.http.get<Rol[]>(this.urlEndPoint).pipe(
      map(roles => roles.find(rol => rol.rol_nombre === nombre) as Rol), 
      filter(rol => !!rol) // Filtrar null o undefined
    );
  }
  getRolById(id: any): Observable<Rol> {
    return this.http.get<Rol>(`${this.urlEndPoint_1}/${id}`)
  }
}

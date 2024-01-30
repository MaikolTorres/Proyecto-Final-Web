import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { Cargo } from './cargo';

@Injectable({
  providedIn: 'root',
})
export class CargoserviceService {
  [x: string]: any;

  private urlEndPoint: string = 'http://localhost:8080/api/cargo/listar';
  private urlEndPoint_1: string = 'http://localhost:8080/api/cargo/guardar';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getCargo(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.urlEndPoint);
  }

  create(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(this.urlEndPoint_1, cargo, {
      headers: this.httpHeaders,
    });
  }
  getcargoid(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.urlEndPoint_1}/${id}`);
  }

  deleteCargo(cargo_id: number): Observable<Cargo> {
    const url = `http://localhost:8080/api/cargo/eliminar/${cargo_id}`; // Ajusta la URL según tu estructura
    return this.http.delete<Cargo>(url);
  }

  updateCargo(cargo: Cargo): Observable<Cargo> {
    const url = `http://localhost:8080/api/cargo/actualizar/${cargo.cargo_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<Cargo>(url, cargo);
  }

  comboidcargo(nombre: string): Observable<boolean> {
    return this.getCargo().pipe(
      map(cargos => cargos.some(cargo => cargo.cargo_nombre === nombre))
    );
  }
 
  getcargoByName(nombre: string): Observable<Cargo> {
    return this.http.get<Cargo[]>(this.urlEndPoint).pipe(
      map(cargos => cargos.find(cargo =>cargo.cargo_nombre === nombre) as Cargo), 
      filter(cargo => !!cargo) // Filtrar null o undefined
    );
  }
}


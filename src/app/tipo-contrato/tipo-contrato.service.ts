import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoContrato } from './tipo-contrato';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoContratoService {
  [x: string]: any;

  private urlEndPoint: string =
    'http://localhost:8080/api/tipocontratos/listar';
  private urlEndPoint_1: string =
    'http://localhost:8080/api/tipocontratos/guardar';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getTipoContrato(): Observable<TipoContrato[]> {
    return this.http.get<TipoContrato[]>(this.urlEndPoint);
  }

  create(tipocontrato: TipoContrato): Observable<TipoContrato> {
    return this.http.post<TipoContrato>(this.urlEndPoint_1, tipocontrato, {
      headers: this.httpHeaders,
    });
  }
  getTipoContratoid(id: number): Observable<TipoContrato> {
    return this.http.get<TipoContrato>(`${this.urlEndPoint_1}/${id}`);
  }

  deleteTipoContrato(tipo_id: number): Observable<TipoContrato> {
    const url = `http://localhost:8080/api/tipocontratos/eliminar/${tipo_id}`; // Ajusta la URL según tu estructura
    return this.http.delete<TipoContrato>(url);
  }

  updateTipoContrato(tipocontrato: TipoContrato): Observable<TipoContrato> {
    const url = `http://localhost:8080/api/tipocontratos/actualizar/${tipocontrato.tipo_id}`;
    console.log('URL de actualización:', url);
    return this.http.put<TipoContrato>(url, tipocontrato).pipe(
      map(response => {
        // Verificar si la respuesta es un JSON válido
        try {
          JSON.parse(JSON.stringify(response));
          // La respuesta es un JSON válido
          console.log('OK'); // Muestra un mensaje de OK en la consola
          return response;
        } catch (error) {
          console.error('La respuesta no es un JSON válido:', error);
          throw error;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al actualizar el Tipo Contrato:', error);
        throw error;
      })
    );
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, BehaviorSubject, tap, map } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || '');
  }

  login(credentials:LoginRequest): Observable<any> {
    
    return this.http.post<any>(environment.urlHost +"auth/login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token ), 
      catchError(this.handleError)
    );
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.currentUserData.next(''); 
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error);
    } else {
      console.error('Backend retornó el código de estado', error);
    }
    return throwError(() => new Error('Algo falló. Por favor, inténtelo nuevamente.'));
  }
}

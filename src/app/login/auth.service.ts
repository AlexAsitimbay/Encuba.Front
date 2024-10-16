import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, of, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import {EntityResponse} from '../shared/models/entity-response';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponse} from './models/auth-response';
import {TokenResponse} from './models/token-response';
import {TokenRequest} from './models/token-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:44332/user/auth';
  private jwtSubject = new BehaviorSubject<string | null>(localStorage.getItem('jwt')); // Estado inicial

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(username: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'X-Forwarded-For': 'Your Client IP' // Cambia esto por la IP del cliente si es necesario
    });

    return this.http.post<EntityResponse<AuthResponse>>(`${this.authUrl}/login`, { username, password }, { headers })
      .pipe(
        map((response: EntityResponse<AuthResponse>) => {
          if (response.isSuccess && response.value) {
            localStorage.setItem('accessToken', response.value.accessToken);
            localStorage.setItem('refreshToken', response.value.refreshToken);
            localStorage.setItem('expiresIn', response.value.expiresIn);
            return true;
          }
          return false;
        })
      );
  }

  // Verificar si el token es válido o ha expirado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getJwt(): Observable<string | null> {
    const accessToken = this.getToken();
    if (!accessToken) {
      return of(null); // Retorna un Observable que emite null si no hay token
    }

    return this.http.post<TokenResponse>(`${this.authUrl}/jwt`, { accessToken }).pipe(
      map(response => {
        const jwt = response.jwt; // Asegúrate de que `jwt` exista en la respuesta
        if (jwt) {
          localStorage.setItem('jwt', jwt); // Guardamos el JWT en localStorage
          this.jwtSubject.next(jwt); // Emitimos el nuevo JWT
          return jwt; // Retornamos el JWT
        }
        return null; // Retorna null si no hay JWT
      }),
      catchError(error => {
        console.error('Error al obtener el JWT:', error);
        return of(null); // Retorna null en caso de error
      })
    );
  }
  getJwtObservable(): Observable<string | null> {
    return this.jwtSubject.asObservable(); // Permite a otros componentes / servicios suscribirse
  }


  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }


  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('accessToken');
  }

  refreshToken(): Observable<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return new Observable<boolean>((observer) => observer.next(false));
    }

    return this.http.post<EntityResponse<AuthResponse>>(`${this.authUrl}/refresh-token`, { refreshToken })
      .pipe(
        map((response: EntityResponse<AuthResponse>) => {
          if (response.isSuccess && response.value) {
            localStorage.setItem('accessToken', response.value.accessToken);
            localStorage.setItem('refreshToken', response.value.refreshToken);
            localStorage.setItem('expiresIn', response.value.expiresIn);
            return true;
          }
          return false;
        })
      );
  }
}

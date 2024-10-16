import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getJwtObservable().pipe(
      switchMap(token => {
        if (token) {
          const decodedToken: any = this.decodeJwt(token);
          const userId = decodedToken.Id; // Asegúrate de que 'id' es el campo correcto
          localStorage.setItem('userId', userId);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        return next.handle(request).pipe(
          catchError(err => {
            console.error('Error en la solicitud:', err);
            // Propaga el error al flujo observable
            return throwError(err);
          })
        );
      })
    );
  }

  private decodeJwt(token: string): any {
    const payload = token.split('.')[1]; // Obtiene la parte del Payload
    const decodedPayload = this.base64UrlDecode(payload); // Decodifica el Payload
    return JSON.parse(decodedPayload); // Convierte a JSON
  }

  private base64UrlDecode(str: string): string {
    // Reemplaza caracteres para hacer la cadena base64 estándar
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (str.length % 4)) % 4); // Añade padding
    return atob(str + padding); // Decodifica base64
  }
}

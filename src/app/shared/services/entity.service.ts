import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EntityResponse} from '../models/entity-response';

@Injectable({
  providedIn: 'root'
})
export class EntityService<T> {

  constructor(private http: HttpClient) {}

  getById(url: string, id: number): Observable<EntityResponse<T>> {
    return this.http.get<EntityResponse<T>>(`${url}/${id}`);
  }

  getAll(url: string): Observable<EntityResponse<T[]>> {
    return this.http.get<EntityResponse<T[]>>(url);
  }

  create(url: string, entity: T): Observable<EntityResponse<T>> {
    return this.http.post<EntityResponse<T>>(url, entity);
  }

  update(url: string, id: number, entity: T): Observable<EntityResponse<T>> {
    return this.http.put<EntityResponse<T>>(`${url}/${id}`, entity);
  }

  delete(url: string, id: string): Observable<EntityResponse<void>> {
    return this.http.delete<EntityResponse<void>>(`${url}/${id}`);
  }
}

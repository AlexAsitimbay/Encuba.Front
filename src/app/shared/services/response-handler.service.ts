import { Injectable } from '@angular/core';
import {EntityErrorResponse} from '../models/entity-error-response';
import {EntityResponse} from '../models/entity-response';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  handleError(response: EntityResponse<any>): string {
    if (response.hasError && response.entityErrorResponse) {
      const error: EntityErrorResponse = response.entityErrorResponse;
      return `Error ${error.code}: ${error.message}`;
    }
    return 'Unknown error occurred';
  }

  isSuccess(response: EntityResponse<any>): boolean {
    return response.isSuccess;
  }
}

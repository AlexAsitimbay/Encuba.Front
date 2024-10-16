import {EntityErrorResponse} from "./entity-error-response";

export interface EntityResponse<T> {
  isSuccess: boolean;
  hasError: boolean;
  entityErrorResponse: EntityErrorResponse;
  value: T;
}

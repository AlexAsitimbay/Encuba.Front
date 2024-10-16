import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EntityResponse} from '../../shared/models/entity-response';
import {EntityService} from '../../shared/services/entity.service';
import {ProductResponse} from '../models/product-response';
import {ProductRequest} from '../models/product-request';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productUrl = 'https://localhost:44332/product';


  constructor(private entityService: EntityService<any>) {}

  // Método para eliminar un producto por ID
  deleteProduct(id: string): Observable<EntityResponse<void>> {
    return this.entityService.delete(this.productUrl, id);
  }

  getAll(): Observable<EntityResponse<ProductResponse[]>> {
    return this.entityService.getAll(this.productUrl);
  }

  add(product: ProductRequest): Observable<EntityResponse<boolean>> {
    return this.entityService.create(this.productUrl, product);
  }

  getById(productId: string): Observable<EntityResponse<ProductResponse>> {
    return this.entityService.getById(this.productUrl, productId);
  }

  update(productId: string, productRequest: ProductRequest): Observable<EntityResponse<ProductResponse>> {
    return this.entityService.update(this.productUrl, productId, productRequest);
  }

}

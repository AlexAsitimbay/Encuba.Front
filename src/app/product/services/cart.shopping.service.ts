import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EntityResponse} from '../../shared/models/entity-response';
import {EntityService} from '../../shared/services/entity.service';
import {ProductResponse} from '../models/product-response';
import {ProductRequest} from '../models/product-request';
import {ProductCacheResponse} from '../cart-product/models/product.cache.response';

@Injectable({
  providedIn: 'root'
})

export class CartShoppingService {
  private productUrl = 'https://localhost:44332/shopping-cart';


  constructor(private entityService: EntityService<any>) {}

  add(product: ProductCacheResponse): Observable<EntityResponse<boolean>> {
    return this.entityService.create(this.productUrl+'/add-cart-cache', product);
  }

  getById(id: string): Observable<EntityResponse<ProductCacheResponse>> {
    return this.entityService.getByIdUrl(`${this.productUrl}/${id}/by-id-cache`);
  }

}

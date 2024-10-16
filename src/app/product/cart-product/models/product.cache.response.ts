import {ProductResponse} from '../../models/product-response';

export interface ProductCacheResponse {
  userId: string;
  quantity: number;
  productResponses: ProductResponse[];
}

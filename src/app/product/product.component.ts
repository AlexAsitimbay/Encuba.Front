import {Component, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {EntityResponse} from '../shared/models/entity-response';
import {ProductResponse} from './models/product-response';
import {ProductService} from './services/product.service';
import {NotificationService} from '../shared/services/notification.service';
import {AddProductDialogComponent} from './add-product-dialog/add-product-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateProductDialogComponent} from './update-product-dialog/update-product-dialog.component';
import {CartShoppingService} from './services/cart.shopping.service';
import {ProductCacheResponse} from './cart-product/models/product.cache.response';
import {CartProductComponent} from './cart-product/cart-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
  products$: Observable<EntityResponse<ProductResponse[]>> | null = null;
  private unsubscribe$ = new Subject<void>();
  cartItems: ProductResponse[] = [];
  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private cartService: CartShoppingService) {
  }

  ngOnInit(): void {
    this.getProducts();
    const userId= localStorage.getItem('userId') as string;
    this.cartService.getById(userId).subscribe(items => {
      this.cartItems = items.value.productResponses;
    });
  }

  getProducts(): void {
    this.products$ = this.productService.getAll();
  }

  addToCart(product: ProductResponse): void {
    const userId= localStorage.getItem('userId') as string;
    const productRequest : ProductCacheResponse = {
      userId: userId,
      quantity: 1,
      productResponses: [product]
    };
    console.log(productRequest);
    this.cartService.add(productRequest).pipe(takeUntil(this.unsubscribe$)).subscribe(response => {
      if (response.isSuccess) {
        this.notificationService.showSuccess('Producto agregado al carrito exitosamente.');
      } else {
        this.notificationService.showError('Error al agregar el producto al carrito: ' + response.entityErrorResponse.message);
      }
    }, error => {
      this.notificationService.showError('Error en la solicitud: ' + error.message);
    });
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).pipe(takeUntil(this.unsubscribe$)).subscribe(response => {
      if (response.isSuccess) {
        this.notificationService.showSuccess('Producto eliminado exitosamente.');
        this.getProducts();
      } else {
        this.notificationService.showError('Error al eliminar el producto: ' + response.entityErrorResponse.message);
      }
    }, error => {
      this.notificationService.showError('Error en la solicitud: ' + error.message);
    });
  }

  updateProduct(productId: string): void {
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      width: '600px',
      maxHeight: '80vh',
      data: {productId: productId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }

  addNewProduct(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent,
      {
        width: '600px',
        maxHeight: '80vh'
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }

  openCartModal(): void {
    const dialogRef = this.dialog.open(CartProductComponent, {
      width: '600px',
      maxHeight: '80vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProducts();
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

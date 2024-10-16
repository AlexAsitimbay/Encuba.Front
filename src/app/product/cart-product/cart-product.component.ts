import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CartShoppingService} from '../services/cart.shopping.service';
import {ProductResponse} from '../models/product-response';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  cartItems: ProductResponse[] = [];

  constructor(
    public dialogRef: MatDialogRef<CartProductComponent>,
    private cartService: CartShoppingService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId'); // Elimina el 'as string' aquí

    // Asegúrate de que userId no sea null antes de llamar al servicio
    if (userId) {
      this.cartService.getById(userId).subscribe(
        (items) => {
          // Verifica si items tiene la estructura esperada
          if (items && items.value && items.value.productResponses) {
            this.cartItems = items.value.productResponses; // Asigna la respuesta a cartItems
          } else {
            console.warn('La respuesta no tiene el formato esperado:', items);
            this.cartItems = []; // Asigna un array vacío si no hay productos
          }
          console.log(this.cartItems);
        },
        (error) => {
          console.error('Error al obtener los productos del carrito:', error);
          this.cartItems = []; // Maneja el error asignando un array vacío
        }
      );
    } else {
      console.warn('No se encontró userId en localStorage');
      this.cartItems = []; // Manejo del caso si no hay userId
    }
  }

  finalizePurchase(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }

  close(): void {
    this.dialogRef.close();
  }

  protected readonly onblur = onblur;
}

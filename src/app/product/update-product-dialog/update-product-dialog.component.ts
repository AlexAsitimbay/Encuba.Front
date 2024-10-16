import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import {NotificationService} from '../../shared/services/notification.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css']
})
export class UpdateProductDialogComponent implements OnInit {
  updateProductForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string },
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    this.updateProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.productService.getById(this.data.productId).subscribe(product => {
      this.updateProductForm.patchValue({
        name: product.value.name,
        description: product.value.description,
        price: product.value.price
      });
    });
  }

  onUpdate(): void {
    if (!this.updateProductForm.valid) {
      return;
    }

    const { productId } = this.data;
    const updatedProduct = this.updateProductForm.value;

    this.productService.update(productId, updatedProduct).subscribe({
      next: () => this.handleSuccess(),
      error: (error) => this.handleError(error)
    });
  }

  private handleSuccess(): void {
    this.notificationService.showSuccess('Producto actualizado con éxito');
    this.dialogRef.close(true);
  }

  private handleError(error: any): void {
    this.notificationService.showError('Error al actualizar el producto');
    console.error('Error al actualizar el producto:', error);
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}

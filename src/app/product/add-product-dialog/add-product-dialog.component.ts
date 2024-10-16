import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {ProductRequest} from '../models/product-request';
import {NotificationService} from '../../shared/services/notification.service'; // Ajusta la ruta de importación según sea necesario

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.add(this.productForm.value).subscribe(() => {
        this.notificationService.showSuccess('Producto agregado con éxito');
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showError('Error al agregar el producto');
        console.error('Error al agregar el producto:', error);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

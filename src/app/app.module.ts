import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './login/jwt-interceptor.service';
import { ProductComponent } from './product/product.component';
import {AuthService} from './login/auth.service';
import {JwtModule} from '@auth0/angular-jwt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BlogComponent } from './blog/blog.component';
import {ProductService} from './product/services/product.service';
import {NotificationService} from './shared/services/notification.service';
import { AddProductDialogComponent } from './product/add-product-dialog/add-product-dialog.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import { UpdateProductDialogComponent } from './product/update-product-dialog/update-product-dialog.component';
import { CartProductComponent } from './product/cart-product/cart-product.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
export function tokenGetter() {
  return localStorage.getItem('accessToken');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    BlogComponent,
    AddProductDialogComponent,
    UpdateProductDialogComponent,
    CartProductComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44332'],
        disallowedRoutes: ['https://localhost:44332/user/auth/login'],
      },
    }),
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatInput,
    MatButton,
    MatDialogTitle,
  ],
  providers: [
    AuthService,
    ProductService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

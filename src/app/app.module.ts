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
export function tokenGetter() {
  return localStorage.getItem('accessToken'); // Asegúrate de que esto sea correcto
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    BlogComponent,
    AddProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44332'], // Cambia esto a tu dominio
        disallowedRoutes: ['https://localhost:44332/user/auth/login'], // Cambia esto si tienes rutas que no necesitan token
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

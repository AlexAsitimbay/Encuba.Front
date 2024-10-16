import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa Reactive Forms
import { Router } from '@angular/router'; // Para la navegación
import { AuthService } from './auth.service'; // Asegúrate de que la ruta sea correcta
import { NotificationService } from '../shared/services/notification.service'; // Un servicio de notificación

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  login() {
    if (this.loginForm.invalid) {
      this.notificationService.showError('Por favor, completa el formulario correctamente.');
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (success) => {
        if (success) {
          console.log('Login exitoso');
          this.authService.getJwt().subscribe(jwt => {
          });
          this.router.navigate(['/product']);
        } else {
          this.notificationService.showError('Error en el login.');
        }
      },
      error: (err) => {
        console.error('Error durante el login:', err);
        this.notificationService.showError('Ocurrió un error durante la autenticación.');
      }
    });
  }
}

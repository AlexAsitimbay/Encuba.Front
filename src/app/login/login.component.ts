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
  loginForm: FormGroup; // Usar Reactive Forms para manejar el formulario

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService // Opcional
  ) {
    // Inicializa el formulario con validaciones
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Validaciones para el email
      password: ['', [Validators.required]] // Validaciones para la contraseña
    });
  }

  // Método para navegar a la página principal
  navigateToHome() {
    this.router.navigate(['/']); // Redirige a la página principal
  }

  // Método para iniciar sesión
  login() {
    if (this.loginForm.invalid) {
      this.notificationService.showError('Por favor, completa el formulario correctamente.'); // Mensaje de error
      return; // Si el formulario es inválido, no continuar
    }

    const { username, password } = this.loginForm.value; // Destructuring para obtener valores

    this.authService.login(username, password).subscribe({
      next: (success) => {
        if (success) {
          console.log('Login exitoso');
          this.router.navigate(['/product']); // Redirige a la página deseada después del login
        } else {
          this.notificationService.showError('Error en el login.'); // Mensaje de error
        }
      },
      error: (err) => {
        console.error('Error durante el login:', err);
        this.notificationService.showError('Ocurrió un error durante la autenticación.'); // Mensaje de error detallado
      }
    });
  }
}

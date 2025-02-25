import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router para redirigir

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.errorMessage = '';
      localStorage.setItem('isLoggedIn', 'true'); // Guardar el estado de inicio de sesión
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}


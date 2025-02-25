import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('isLoggedIn'); // Verificar el estado de inicio de sesión

    if (isLoggedIn) {
      return true; // Permitir acceso si el usuario ha iniciado sesión
    } else {
      this.router.navigate(['/login']); // Redirigir a login si no ha iniciado sesión
      return false; // Denegar acceso
    }
  }
}

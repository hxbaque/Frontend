import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SalasComponent } from './salas/salas.component';
import { AsignarPeliculasComponent } from './asignar-peliculas/asignar-peliculas.component';
import { AuthGuard } from './auth.guard'; // Importar el guardia

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta pública
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'peliculas', component: PeliculasComponent },
      { path: 'salas', component: SalasComponent },
      { path: 'asignar-peliculas', component: AsignarPeliculasComponent },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

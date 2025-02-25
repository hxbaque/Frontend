import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalSalas = 0;
  totalSalasDisponibles = 0;
  totalPeliculas = 0;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    console.log('DashboardComponent cargado');
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.loadDashboardData();
    }
  }

  private isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private loadDashboardData(): void {
    console.log('Cargando datos del dashboard...');

    this.apiService.getTotalSalas().subscribe(total => {
      console.log('Total de salas de cine:', total);
      this.totalSalas = total;
    }, error => {
      console.error('Error al obtener total de salas:', error);
    });

    this.apiService.getTotalSalasDisponibles().subscribe(totalDisponibles => {
      console.log('Total de salas disponibles:', totalDisponibles);
      this.totalSalasDisponibles = totalDisponibles;
    }, error => {
      console.error('Error al obtener salas disponibles:', error);
    });


    this.apiService.getTotalPeliculas().subscribe(total => {
      console.log('Total de películas:', total);
      this.totalPeliculas = total;
    }, error => {
      console.error('Error al obtener total de películas:', error);
    });
  }
  isAtDashboard(): boolean {
    return this.router.url === '/dashboard';
  }
}

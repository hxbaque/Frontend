import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, switchMap, catchError } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { Pelicula } from './models/pelicula.model';
import { SalaCine } from './models/sala-cine.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getAllSalasCine(): Observable<SalaCine[]> {
    return this.http.get<SalaCine[]>(`${this.apiUrl}/salas-cine`).pipe(
      map(salas => {
        console.log('Salas de cine obtenidas:', salas);
        return salas;
      }),
      catchError(error => {
        console.error('Error al obtener salas de cine', error);
        return of([]); 
      })
    );
  }

  getTotalSalas(): Observable<number> {
    return this.getAllSalasCine().pipe(
      map(salas => {
        console.log('Total de salas:', salas.length);
        return salas.length;
      }),
      catchError(error => {
        console.error('Error al contar salas de cine', error);
        return of(0); 
      })
    );
  }

  getTotalSalasDisponibles(): Observable<number> {
    return this.getAllSalasCine().pipe(
      switchMap(salas => {
        const availabilityChecks = salas.map(sala => 
          this.http.get<{ message: string }>(`${this.apiUrl}/salas-cine/check-availability/${sala.nombre}`)
            .pipe(
              map(response => {
                console.log(`Disponibilidad de la sala ${sala.nombre}:`, response);
                return response.message === "Sala disponible" ? 1 : 0;
              }),
              catchError(error => {
                console.error(`Error al verificar disponibilidad de la sala ${sala.nombre}`, error);
                return of(0); 
              })
            )
        );
        return forkJoin(availabilityChecks);
      }),
      map(results => {
        const totalDisponibles = results.reduce((total, count) => total + count, 0);
        console.log('Total de salas disponibles:', totalDisponibles);
        return totalDisponibles;
      }),
      catchError(error => {
        console.error('Error al contar salas disponibles', error);
        return of(0); 
      })
    );
  }
  
  
  getAllPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/peliculas`).pipe(
      map(peliculas => {
        console.log('Películas obtenidas:', peliculas);
        return peliculas;
      }),
      catchError(error => {
        console.error('Error al obtener películas', error);
        return of([]); 
      })
    );
  }

  getTotalPeliculas(): Observable<number> {
    return this.getAllPeliculas().pipe(
      map(peliculas => {
        console.log('Total de películas:', peliculas.length);
        return peliculas.length;
      }),
      catchError(error => {
        console.error('Error al contar películas', error);
        return of(0); 
      })
    );
  }
}

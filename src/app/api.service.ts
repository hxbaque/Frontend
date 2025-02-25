import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, switchMap, catchError } from 'rxjs/operators';
import { forkJoin, Observable, of, EMPTY } from 'rxjs';
import { Pelicula } from './models/pelicula.model';
import { SalaCine } from './models/sala-cine.model';
import { SalaCineCrear } from './models/sala-cine-crear.model';
import { PeliculaCrear } from './models/pelicula-crear.model';
import { AsignarPeliculaSala } from './models/PeliculaSalaCine.models';
import { AsignarPeliculaSalacrear } from './models/AsignarPeliculaSala.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  getAllSalasCine(): Observable<SalaCine[]> {
    return this.http.get<SalaCine[]>(`${this.apiUrl}/salas-cine`).pipe(
      map(salas => {

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

        return peliculas.length;
      }),
      catchError(error => {
        console.error('Error al contar películas', error);
        return of(0); 
      })
    );
  }
  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/peliculas`);
  }

  createPelicula(pelicula: PeliculaCrear): Observable<Pelicula> {
    return this.http.post<Pelicula>(`${this.apiUrl}/peliculas`, pelicula);
  }

  updatePelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/peliculas`, pelicula);
  }
  deletePelicula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/peliculas/${id}`);
  }

  getSalas(): Observable<SalaCine[]> {
    return this.http.get<SalaCine[]>(`${this.apiUrl}/salas-cine`);
  }

  createSala(sala: SalaCineCrear): Observable<SalaCine> {
    return this.http.post<SalaCine>(`${this.apiUrl}/salas-cine`, sala);
  }

  updateSala(sala: SalaCine): Observable<SalaCine> {
    return this.http.put<SalaCine>(`${this.apiUrl}/salas-cine/${sala.id}`, sala);
  }
  deleteSala(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/salas-cine/${id}`);
  }

  getAllPeliculasSalas(): Observable<AsignarPeliculaSala[]> {
    return this.http.get<AsignarPeliculaSala[]>(`${this.apiUrl}/peliculas-salas-cine`).pipe(
      map(relaciones => {

        return relaciones;
      }),
      catchError(error => {
        console.error('Error al obtener relaciones', error);
        return of([]);
      })
    );
  }

  createPeliculaSala(peliculaSala: AsignarPeliculaSalacrear): Observable<AsignarPeliculaSala> {
    return this.http.post<AsignarPeliculaSala>(`${this.apiUrl}/peliculas-salas-cine`, peliculaSala).pipe(
      catchError(this.handleError<AsignarPeliculaSala>('createPeliculaSala'))
    );
  }

  updatePeliculaSala(peliculaSala: AsignarPeliculaSala): Observable<AsignarPeliculaSala> {
    return this.http.put<AsignarPeliculaSala>(`${this.apiUrl}/peliculas-salas-cine/${peliculaSala.id}`, peliculaSala).pipe(
      catchError(this.handleError<AsignarPeliculaSala>('updatePeliculaSala'))
    );
  }

  deletePeliculaSala(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/peliculas-salas-cine/${id}`).pipe(
      catchError(this.handleError<void>('deletePeliculaSala'))
    );
  }
  private handleError<T>(operation = 'operación', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Error en ${operation}:`, error);
      return of(result as T); 
    };
  }
}

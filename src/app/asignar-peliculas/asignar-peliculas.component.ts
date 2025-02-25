import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AsignarPeliculaSalacrear } from '../models/AsignarPeliculaSala.models';
import { MatDialog } from '@angular/material/dialog';
import { MensajeDialogoComponent } from '../components/mensaje-dialogo/mensaje-dialogo.component';

@Component({
  selector: 'app-asignar-peliculas',
  templateUrl: './asignar-peliculas.component.html',
  styleUrls: ['./asignar-peliculas.component.css']
})
export class AsignarPeliculasComponent implements OnInit {
  asignacion: AsignarPeliculaSalacrear = {
    fecha_publicacion: new Date(),
    fecha_fin: new Date(),
    id_sala_cine: 0,
    id_pelicula: 0,
    estado: 1
  };

  salas: any[] = [];
  peliculas: any[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadSalas();
    this.loadPeliculas();
  }

  loadSalas(): void {
    this.apiService.getSalas().subscribe(
      salas => this.salas = salas,
      () => this.mostrarMensaje('Error al cargar las salas', 'error')
    );
  }

  loadPeliculas(): void {
    this.apiService.getPeliculas().subscribe(
      peliculas => this.peliculas = peliculas,
      () => this.mostrarMensaje('Error al cargar las películas', 'error')
    );
  }

  onSubmit(): void {
    this.apiService.createPeliculaSala(this.asignacion).subscribe(
      () => this.mostrarMensaje('Película asignada correctamente', 'success'),
      (error) => {
        
        const mensajeError = error.error?.message || 'Error al asignar la película a la sala';
        console.error('Error al asignar película:', mensajeError); 
        this.mostrarMensaje(mensajeError, 'error');
      }
    );
  }
  
  mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.dialog.open(MensajeDialogoComponent, {
      data: { mensaje, tipo }
    });
  }
}

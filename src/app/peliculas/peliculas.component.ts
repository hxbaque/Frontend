import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Pelicula } from './../models/pelicula.model';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  pelicula: Pelicula = { id_pelicula: 0, nombre: '', duracion: 0, estado: 1 };
  displayedColumns: string[] = ['nombre', 'duracion', 'estado', 'acciones'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPeliculas();
  }

  loadPeliculas(): void {
    this.apiService.getPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
    }, error => {
      console.error('Error al cargar las películas:', error);
    });
  }

  onSubmit(): void {
    if (this.pelicula.id_pelicula) {
        this.apiService.updatePelicula(this.pelicula).subscribe(() => {
            this.loadPeliculas();
            this.clearForm();
        }, error => {
            console.error('Error al actualizar la película:', error);
        });
    } else {
        const { id_pelicula, ...peliculaSinId } = this.pelicula; 
        this.apiService.createPelicula(peliculaSinId).subscribe(() => {
            this.loadPeliculas();
            this.clearForm();
        }, error => {
            console.error('Error al agregar la película:', error);
        });
    }
}


  editPelicula(pelicula: Pelicula): void {
    this.pelicula = { ...pelicula }; 
  }

  deletePelicula(id: number): void {
    this.apiService.deletePelicula(id).subscribe(() => {
      this.loadPeliculas();
    }, error => {
      console.error('Error al eliminar la película:', error);
    });
  }

  clearForm(): void {
    this.pelicula = { id_pelicula: 0, nombre: '', duracion: 0, estado: 1 }; 
  }
}

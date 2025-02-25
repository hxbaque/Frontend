import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AsignarPeliculaSalacrear } from '../models/AsignarPeliculaSala.models';

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
        id_pelicula: 0
    };

    salas: any[] = []; // Aquí deberías tener los tipos correspondientes
    peliculas: any[] = []; // Aquí deberías tener los tipos correspondientes

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        this.loadSalas();
        this.loadPeliculas();
    }

    loadSalas(): void {
        this.apiService.getSalas().subscribe(salas => {
            this.salas = salas;
        });
    }

    loadPeliculas(): void {
        this.apiService.getPeliculas().subscribe(peliculas => {
            this.peliculas = peliculas;
        });
    }

    onSubmit(): void {
        this.apiService.createPeliculaSala(this.asignacion).subscribe(() => {
            console.log('Película asignada a sala con éxito');
        }, error => {
            console.error('Error al asignar película a sala:', error);
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { SalaCine } from './../models/sala-cine.model'; 

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent implements OnInit {
  sala: SalaCine = { id: 0, nombre: '', estado: 1 }; 
  salas: SalaCine[] = [];
  displayedColumns: string[] = ['nombre', 'estado', 'acciones'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadSalas();
  }

  loadSalas(): void {
    this.apiService.getSalas().subscribe(data => {
      this.salas = data;
    }, error => {
      console.error('Error al cargar salas', error);
    });
  }

  onSubmit(): void {
    if (this.sala.id) {
        this.apiService.updateSala(this.sala).subscribe(() => {
            this.loadSalas();
            this.resetForm();
        });
    } else {
        const { id, ...salaSinId } = this.sala; 
        this.apiService.createSala(salaSinId).subscribe(() => {
            this.loadSalas();
            this.resetForm();
        });
    }
}


  resetForm(): void {
    this.sala = { id: 0, nombre: '', estado: 1 }; 
  }
  editSala(sala: SalaCine): void {
    this.sala = { ...sala };
  }
  deleteSala(id: number): void {
    this.apiService.deleteSala(id).subscribe(() => {
      this.loadSalas();
    }, error => {
      console.error('Error al eliminar sala', error);
    });
  }
}

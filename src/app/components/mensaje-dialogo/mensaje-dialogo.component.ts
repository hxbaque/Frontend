import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mensaje-dialogo',
  template: `
    <h1 mat-dialog-title>{{ data.tipo === 'success' ? 'Éxito' : 'Error' }}</h1>
    <div mat-dialog-content>
      <p>{{ data.mensaje }}</p>
    </div>
    <div mat-dialog-actions>
    </div>
  `
})
export class MensajeDialogoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { mensaje: string; tipo: string }) {}

  onClose(): void {
  }
}

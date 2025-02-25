import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Necesario para animaciones
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { SalasComponent } from './salas/salas.component';
import { AsignarPeliculasComponent } from './asignar-peliculas/asignar-peliculas.component';

// Importar módulos de Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';




import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { Pelicula } from './models/pelicula.model';
import { SalaCine } from './models/sala-cine.model';
import { MensajeDialogoComponent } from './components/mensaje-dialogo/mensaje-dialogo.component'; 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PeliculasComponent,
    SalasComponent,
    AsignarPeliculasComponent,
    MensajeDialogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

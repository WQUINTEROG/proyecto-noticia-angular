import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ListadoComponent } from './components/listado/listado';
import { DetalleComponent } from './components/detalle/detalle';
import { FavoritosComponent } from './components/favoritos/favoritos';
import { ContactoComponent } from './components/contacto/contacto';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listado', component: ListadoComponent },

  // Ruta del detalle: acepta ID opcional
  // - /detalle/5 → carga la noticia 5
  // - /detalle → carga la última noticia vista
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'detalle', component: DetalleComponent },

  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: '' }
];
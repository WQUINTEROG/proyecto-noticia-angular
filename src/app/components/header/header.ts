// header.ts
// Componente del encabezado de la aplicación.
// Muestra el logo y el menú de navegación principal.
// Usa RouterModule para habilitar la navegación con routerLink en el HTML.

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],  // Necesario para usar routerLink en el HTML
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  // Este componente no tiene lógica propia.
  // Su única responsabilidad es mostrar el logo y el menú de navegación.
}
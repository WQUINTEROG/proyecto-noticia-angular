// footer.ts
// Componente del pie de página de la aplicación.
// Muestra información de contacto, redes sociales y derechos de autor.
// Es un componente presentacional: no tiene lógica, solo muestra información.

import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  // Este componente no tiene lógica propia.
  // Su única responsabilidad es mostrar la plantilla HTML y aplicar los estilos CSS.
}
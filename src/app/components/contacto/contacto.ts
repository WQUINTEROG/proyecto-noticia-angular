// contacto.ts
// Componente del formulario de contacto con validaciones.
// Valida que los campos estén completos y que el correo tenga formato válido.

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class ContactoComponent {

  // Propiedades vinculadas al formulario con [(ngModel)]
  nombre: string = '';
  correo: string = '';
  asunto: string = '';
  mensaje: string = '';

  // Array que acumula los errores de validación
  errores: string[] = [];
  
  // Bandera que indica si el envío fue exitoso
  exito: boolean = false;
/**
   * Valida el formulario y muestra los errores o el mensaje de éxito.
   * Se ejecuta al hacer clic en "Enviar".
   */
  enviar(): void {
    this.errores = [];
    this.exito = false;

// Validar campos obligatorios
    if (!this.nombre.trim()) this.errores.push('El nombre es obligatorio');
    if (!this.correo.trim()) this.errores.push('El correo es obligatorio');
    if (!this.asunto.trim()) this.errores.push('El asunto es obligatorio');
    if (!this.mensaje.trim()) this.errores.push('El mensaje es obligatorio');
// Validar formato del correo con expresión regular
    if (this.correo.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo)) {
      this.errores.push('Correo inválido (debe incluir @ y un dominio)');
    }

    // Si no hay errores, mostrar mensaje de éxito y limpiar el formulario
    if (this.errores.length === 0) {
      this.exito = true;
      this.nombre = '';
      this.correo = '';
      this.asunto = '';
      this.mensaje = '';
      
  // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        this.exito = false;
      }, 5000);
    }
  }
}
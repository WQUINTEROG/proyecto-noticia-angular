// favoritos.ts
// Servicio que gestiona los favoritos del usuario con localStorage.
// Notifica los cambios a todos los componentes suscritos con BehaviorSubject.

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private storageKey = 'favoritos';

  // BehaviorSubject que notifica los cambios a los componentes suscritos
  private favoritosSubject = new BehaviorSubject<number[]>(this.leerFavoritos());

  // Observable público al que los componentes se suscriben
  favoritos$ = this.favoritosSubject.asObservable();

  /**
   * Lee los favoritos directamente desde localStorage.
   */
  private leerFavoritos(): number[] {
    const favoritos = localStorage.getItem(this.storageKey);
    return favoritos ? JSON.parse(favoritos) : [];
  }

  /**
   * Obtiene los favoritos actuales.
   */
  obtenerFavoritos(): number[] {
    return this.leerFavoritos();
  }

  /**
   * Agrega o quita un favorito y notifica a los suscriptores.
   */
  toggleFavorito(id: number): boolean {
    let favoritos = this.leerFavoritos();
    const index = favoritos.indexOf(id);
    let agregado = false;

    if (index === -1) {
      favoritos.push(id);
      agregado = true;
    } else {
      favoritos.splice(index, 1);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(favoritos));
    this.favoritosSubject.next(favoritos);
    return agregado;
  }

  /**
   * Verifica si una noticia está en favoritos.
   */
  esFavorito(id: number): boolean {
    return this.leerFavoritos().includes(id);
  }
}
// noticias.ts
// Servicio que gestiona la carga de noticias desde el archivo JSON.
// Proporciona métodos para obtener todas las noticias, una por ID o por categoría.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

// Interfaz que define la estructura de una noticia
export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  imagen: string;
  contenido: string;
  autor: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'   // El servicio está disponible en toda la aplicación
})
export class NoticiasService {

  // Ruta del archivo JSON en la carpeta assets
  private apiUrl = 'assets/data/noticias.json';

  constructor(private http: HttpClient) {}

/**
   * Obtiene todas las noticias desde el archivo JSON.
   * @returns Observable con el array de noticias
   */
  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  /**
   * Obtiene una noticia específica por su ID.
   * @param id - ID de la noticia a buscar
   * @returns Observable con la noticia encontrada o undefined
   */
  getNoticiaById(id: number): Observable<Noticia | undefined> {
    return this.http.get<Noticia[]>(this.apiUrl).pipe(
      map(noticias => noticias.find(n => n.id === id))
    );
  }
/**
   * Obtiene las noticias filtradas por categoría.
   * @param categoria - Categoría a filtrar
   * @returns Observable con el array de noticias filtradas
   */
  getNoticiasPorCategoria(categoria: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl).pipe(
      map(noticias => categoria === 'Todas'
        ? noticias
        : noticias.filter(n => n.categoria === categoria)
      )
    );
  }
}
// listado.ts
// Componente que muestra el listado de noticias con filtros por categoría.
// Se suscribe al servicio de favoritos para actualizar el corazón en tiempo real.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';
import { FavoritosService } from '../../services/favoritos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listado.html',
  styleUrls: ['./listado.css']
})
export class ListadoComponent implements OnInit, OnDestroy {

  // Array con todas las noticias cargadas
  noticias: Noticia[] = [];

  // Array con las noticias filtradas según la categoría actual
  noticiasFiltradas: Noticia[] = [];

  // Categoría actual seleccionada (por defecto "Todas")
  categoriaActual: string = 'Todas';

  // Array con los IDs de las noticias favoritas
  favoritos: number[] = [];

  // Suscripción a los cambios de favoritos
  private favoritosSub?: Subscription;

  constructor(
    private noticiasService: NoticiasService,
    private favoritosService: FavoritosService
  ) {}

  /**
   * Se ejecuta al inicializar el componente.
   * Carga las noticias y se suscribe a los cambios de favoritos.
   */
  ngOnInit(): void {
    // Cargar todas las noticias
    this.noticiasService.getNoticias().subscribe({
      next: (data) => {
        this.noticias = data;
        this.noticiasFiltradas = data;
      },
      error: (err) => console.error('Error al cargar noticias:', err)
    });

    // Suscribirse a los cambios de favoritos
    this.favoritosSub = this.favoritosService.favoritos$.subscribe(favoritos => {
      this.favoritos = favoritos;
    });
  }

  /**
   * Filtra las noticias según la categoría seleccionada.
   * @param categoria - Categoría a filtrar
   */
  filtrar(categoria: string): void {
    this.categoriaActual = categoria;
    this.noticiasFiltradas = categoria === 'Todas'
      ? this.noticias
      : this.noticias.filter(n => n.categoria === categoria);
  }

  /**
   * Verifica si una noticia está en favoritos.
   * @param id - ID de la noticia
   */
  esFavorito(id: number): boolean {
    return this.favoritos.includes(id);
  }

  /**
   * Agrega o quita una noticia de favoritos.
   * @param id - ID de la noticia
   */
  toggleFavorito(id: number): void {
    this.favoritosService.toggleFavorito(id);
  }

  /**
   * Se ejecuta al destruir el componente.
   * Cancela la suscripción para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.favoritosSub?.unsubscribe();
  }
}
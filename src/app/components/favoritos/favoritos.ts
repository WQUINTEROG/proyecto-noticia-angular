// favoritos.ts
// Componente que muestra las noticias guardadas como favoritas.
// Se suscribe al servicio para actualizarse automáticamente.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';
import { FavoritosService } from '../../services/favoritos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.html',
  styleUrls: ['./favoritos.css']
})
export class FavoritosComponent implements OnInit, OnDestroy {

  noticiasFavoritas: Noticia[] = [];
  private todasLasNoticias: Noticia[] = [];
  private favoritosSub?: Subscription;

  constructor(
    private noticiasService: NoticiasService,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    // Cargar todas las noticias una sola vez
    this.noticiasService.getNoticias().subscribe({
      next: (data) => {
        this.todasLasNoticias = data;
        this.actualizarFavoritos();
      }
    });

    // Suscribirse a los cambios de favoritos
    this.favoritosSub = this.favoritosService.favoritos$.subscribe(() => {
      this.actualizarFavoritos();
    });
  }

  /**
   * Filtra las noticias favoritas según los IDs guardados.
   */
  private actualizarFavoritos(): void {
    const favoritos = this.favoritosService.obtenerFavoritos();
    this.noticiasFavoritas = this.todasLasNoticias.filter(n => favoritos.includes(n.id));
  }

  /**
   * Elimina una noticia de favoritos.
   */
  eliminar(id: number): void {
    this.favoritosService.toggleFavorito(id);
  }

  ngOnDestroy(): void {
    this.favoritosSub?.unsubscribe();
  }
}
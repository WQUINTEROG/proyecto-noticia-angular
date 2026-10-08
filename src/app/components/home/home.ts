// home.ts
// Componente del Home. Se suscribe a los cambios de favoritos.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';
import { FavoritosService } from '../../services/favoritos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  noticiasDestacadas: Noticia[] = [];
  favoritos: number[] = [];

  private favoritosSub?: Subscription;

  constructor(
    private noticiasService: NoticiasService,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (data) => {
        this.noticiasDestacadas = data.slice(0, 3);
      }
    });

    this.favoritosSub = this.favoritosService.favoritos$.subscribe(favoritos => {
      this.favoritos = favoritos;
    });
  }

  esFavorito(id: number): boolean {
    return this.favoritos.includes(id);
  }

  toggleFavorito(id: number): void {
    this.favoritosService.toggleFavorito(id);
  }

  ngOnDestroy(): void {
    this.favoritosSub?.unsubscribe();
  }
}
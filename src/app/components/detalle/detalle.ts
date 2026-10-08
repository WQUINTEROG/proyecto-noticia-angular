// detalle.ts
// Componente que muestra el detalle de una noticia.
// Se suscribe al servicio de favoritos para actualizar el botón.

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';
import { FavoritosService } from '../../services/favoritos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle.html',
  styleUrls: ['./detalle.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  noticia?: Noticia;
  esFavoritoActual: boolean = false;

  private favoritosSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : this.obtenerUltimaVista();
    this.cargarNoticia(id);

    // Suscribirse a los cambios de favoritos
    this.favoritosSub = this.favoritosService.favoritos$.subscribe(favoritos => {
      if (this.noticia) {
        this.esFavoritoActual = favoritos.includes(this.noticia.id);
      }
    });
  }

  private obtenerUltimaVista(): number {
    const ultima = localStorage.getItem('ultimaNoticia');
    return ultima ? Number(ultima) : 1;
  }

  cargarNoticia(id: number): void {
    this.noticiasService.getNoticiaById(id).subscribe({
      next: (data) => {
        this.noticia = data;
        if (data) {
          localStorage.setItem('ultimaNoticia', data.id.toString());
          this.esFavoritoActual = this.favoritosService.esFavorito(data.id);
        }
      }
    });
  }

  toggleFavorito(): void {
    if (this.noticia) {
      this.favoritosService.toggleFavorito(this.noticia.id);
    }
  }

  ngOnDestroy(): void {
    this.favoritosSub?.unsubscribe();
  }
}
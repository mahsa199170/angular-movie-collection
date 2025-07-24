import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() isFavorite: boolean = false;
  @Output() movieClick = new EventEmitter<Movie>();
  @Output() favoriteToggle = new EventEmitter<Movie>();

  imageError: boolean = false;

  onMovieClick(): void {
    this.movieClick.emit(this.movie);
  }

  onFavoriteToggle(event: Event): void {
    event.stopPropagation(); //prevent triggering movie click
    this.favoriteToggle.emit(this.movie);
  }

  onImageError(): void {
    this.imageError = true;
  }
}

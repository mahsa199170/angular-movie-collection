import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],

  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  @Input() movies: Movie[] = [];
  @Input() loading: boolean = false;
  @Input() favorites: number[] = [];
  @Output() favoriteToggled = new EventEmitter<Movie>();
  @Output() movieSelected = new EventEmitter<Movie>();

  //Is called when a movie card is clicked
  onMovieClick(movie: Movie): void {
    this.movieSelected.emit(movie);
  }

  onFavoriteToggle(movie: Movie): void {
    this.favoriteToggled.emit(movie);
  }

  isFavorite(movieId: number): boolean {
    return this.favorites.includes(movieId);
  }

  //Used for ngfor trackBy to optimize rendering
  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}

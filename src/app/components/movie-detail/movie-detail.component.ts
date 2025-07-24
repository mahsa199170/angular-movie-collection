import { Movie } from './../../models/movie.model';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movies.services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  loading = false;
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);
  private destroy$ = new Subject<void>();

  imageError: boolean = false;

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const movieId = +params['id'];
      if (movieId) {
        this.loadMovie(movieId);
      }
    });

    this.movieService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
      });
    this.movieService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        this.error = error;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //Fetch the movie by Id from MovieService
  loadMovie(movieId: number): void {
    this.movieService.getMovieById(movieId).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      error: (error) => {
        console.error('erro loading movie:', error);
        this.error = 'Movie not found';
      },
    });
  }

  onFavoriteToggle(): void {
    if (this.movie) {
      if (this.movieService.isFavorite(this.movie.id)) {
        this.movieService.removeFromFavorites(this.movie.id);
      } else {
        this.movieService.addToFavorites(this.movie.id);
      }
    }
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  onImageError(): void {
    this.imageError = true;
  }

  formatRunTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  isFavorite(movieId: number): boolean {
    return this.movieService.isFavorite(movieId);
  }
}

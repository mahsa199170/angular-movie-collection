//handles fetching movies, genres, and favorites from MovieService
//manages loading and erro states for teh main page

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Movie } from './models/movie.model';
import { MovieService } from './services/movies.services';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MovieListComponent,
    RouterOutlet,
    FormsModule,
    SearchBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  protected title = 'angular-challenge';
  allMovies: Movie[] = [];
  filteredMovies: Movie[] = [];
  favorites: number[] = [];
  loading = false;
  error: string | null = null;

  //Genre filter state
  genres: string[] = [];
  genresLoading = false;
  genresError: string | null = null;
  selectedGenre: string = '';

  //show favorites only
  showFavoritesOnly: boolean = false;

  //Sorting state

  selectedSort: 'title' | 'year' | 'rating' = 'title';

  isMainPage = true;

  public movieService = inject(MovieService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  // public isLoading = false;

  ngOnInit(): void {
    this.getMovies();
    this.loadFavorites();
    this.loadGenres();
    this.movieService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.loading = loading;
        console.log('Loading State:', loading);
      });
    this.movieService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        this.error = error;
        console.log('Error State:', error);
      });
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.isMainPage = this.router.url === '/';
        if (this.isMainPage) {
          this.loadFavorites(); //Always refresh favorites wne returning to main page
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.allMovies = movies;
        this.filterMovies();
      },
      error: (error) => {
        console.log('Error loading movies:', error);
      },
    });
  }

  loadGenres(): void {
    this.genresLoading = true;
    this.genresError = null;
    this.movieService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
        this.genresLoading = false;
      },
      error: (error) => {
        this.genresError = 'Failed to load genres';
        this.genresLoading = false;
      },
    });
  }

  loadFavorites(): void {
    this.favorites = this.movieService.getFavorites();
    this.filterMovies();
  }

  onSearchChange(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filterMovies();
      return;
    }
    this.movieService.searchMovies(searchTerm).subscribe({
      next: (movies) => {
        this.allMovies = movies;
        this.filterMovies();
      },
      error: (error) => {
        console.log('Error searching movies:', error);
      },
    });
  }

  onGenreChange(genre: string): void {
    this.selectedGenre = genre;
    this.filterMovies();
  }

  onSortChange(): void {
    this.filterMovies();
  }

  filterMovies(): void {
    let movies = this.allMovies;
    if (this.selectedGenre) {
      movies = movies.filter((m) => m.genre === this.selectedGenre);
    }
    if (this.showFavoritesOnly) {
      movies = movies.filter((m) => this.favorites.includes(m.id));
    }
    if (this.selectedSort === 'title') {
      movies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.selectedSort === 'year') {
      movies = [...movies].sort((a, b) => a.year - b.year);
    } else if (this.selectedSort === 'rating') {
      movies = [...movies].sort((a, b) => b.rating - a.rating);
    }
    this.filteredMovies = movies;
  }

  onShowFavoritesToggle(): void {
    this.filterMovies();
  }

  onMovieSelect(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }

  onFavoriteToggle(movies: Movie): void {
    if (this.movieService.isFavorite(movies.id)) {
      this.movieService.removeFromFavorites(movies.id);
    } else {
      this.movieService.addToFavorites(movies.id);
    }
    this.loadFavorites();
  }

  clearError(): void {
    this.error = null;
  }
}

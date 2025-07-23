import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Movie } from '../models/movie.model';

// export const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  //base URL for the backedn API
  private apiUrl = 'http://localhost:3000/api';

  //subjects to manage loading and error state across the app
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  //observables for components to subscribe to loading and error state
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  private readonly http = inject(HttpClient);

  //Get all movies
  getMovies(): Observable<Movie[]> {
    this.setLoading(true); //show laoding spinner in UI
    this.clearError(); //clear any previosu errors

    return this.http.get<Movie[]>(`${this.apiUrl}/movies`).pipe(
      tap(() => this.setLoading(false)),
      catchError(this.handleError.bind(this))
    );
  }

  // Search movies by title

  searchMovies(searchTerm: string): Observable<Movie[]> {
    this.setLoading(true);
    this.clearError();

    //if searchItem is empty param will be an empty object
    const params = searchTerm ? { search: searchTerm } : {};

    return this.http
      .get<Movie[]>(`${this.apiUrl}/movies`, { params: params as any })
      .pipe(
        tap(() => this.setLoading(false)),
        catchError(this.handleError.bind(this))
      );
  }

  //Get a movie by its id
  getMovieById(id: number): Observable<Movie> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`).pipe(
      tap(() => this.setLoading(false)),
      catchError(this.handleError.bind(this))
    );
  }

  //Get all genres

  getGenres(): Observable<string[]> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<string[]>(`${this.apiUrl}/genres`).pipe(
      tap(() => this.setLoading(false)),
      catchError(this.handleError.bind(this))
    );
  }

  // ---Favorite management with localStoarge ---

  //Get the list of favorite movie ids from localStorage
  getFavorites(): number[] {
    const favorites = localStorage.getItem('movieFavorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  //Add a movie to favorites ( By Id)
  addToFavorites(movieId: number): void {
    const favorites = this.getFavorites();
    //onl add if not already in favorites
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    }
  }

  //Remove a movie from fav
  removeFromFavorites(movieId: number): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
  }

  //Check if movie is in favorites
  isFavorite(movieId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(movieId);
  }

  //--- Helper methods for state management and errror handling ---

  //set the laoding state
  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  //set teh error message ( used to show errors in the UI)
  private setError(error: string): void {
    this.errorSubject.next(error);
  }

  private clearError(): void {
    this.errorSubject.next(null);
  }

  //Handle HTTP errors from the backend
  private handleError(error: HttpErrorResponse): Observable<never> {
    this.setLoading(false); //always stop loading spinner on error

    let errorMessage = 'An error occurred!!';

    if (error.error instanceof ErrorEvent) {
      //clinet-side error or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //server-side errror - returned an unsuccessfull response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.setError(errorMessage); //update error observable

    //throwError craetes an observable that emits an error
    return throwError(() => new Error(errorMessage));
  }
}

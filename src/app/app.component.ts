import { Component, inject, OnInit } from '@angular/core';
import { Movie } from './models/movie.model';
import { MovieService } from './services/movies.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  protected title = 'angular-challenge';

  public MovieService = inject(MovieService);

  public isLoading = false;

  ngOnInit(): void {
    this.MovieService.loading$.subscribe((loading) => {
      this.isLoading = loading;
      console.log('Loading State:', loading);
    });

    this.testGetMovies();
    this.testSearchmovies();
    this.testGetMovieById(3);
    this.testGetGenre();
    this.testFavorites();
  }

  testGetMovies() {
    this.MovieService.getMovies().subscribe({
      next: (movies) => console.log('getmovies', movies),
      error: (err) => console.log('getMovies error', err),
    });
  }

  testSearchmovies() {
    //test with the real title
    this.MovieService.searchMovies('Matrix').subscribe({
      next: (movies) => console.log('serach result (matrix)', movies),
      error: (err) => console.log('serach result (matrix)', err),
    });

    //tets with empty string (should return all movies)
    this.MovieService.searchMovies('').subscribe({
      next: (movies) => console.log('serach result (empty string)', movies),
      error: (err) => console.log('serach error (empty string)', err),
    });

    //test with some unknow serach tersms (expect empty array)

    this.MovieService.searchMovies('mjbfhac').subscribe({
      next: (movies) => console.log('serach result (mjbfhac)', movies),
      error: (err) => console.log('serach result (mjbfhac)', err),
    });
  }

  testGetMovieById(id: number) {
    console.log('etching movie by id:', id);
    this.MovieService.getMovieById(id).subscribe({
      next: (movie) => console.log(`movie with id of ${id}`, movie),
      error: (err) => console.log(`error fetching movie with id ${id}`, err),
    });
  }

  testGetGenre() {
    this.MovieService.getGenres().subscribe({
      next: (genres) => console.log('genres receieved', genres),
      error: (err) => console.log('genres error', err),
    });
  }

  testFavorites() {
    const movieId = 3;

    //add to favorite
    this.MovieService.addToFavorites(movieId);
    console.log(`added movie ${movieId} to favorites`);

    //chekc if its favorite

    const isFav = this.MovieService.isFavorite(movieId);
    console.log(`is movie ${movieId} favorite?`, isFav); //should be treu

    //get current favorites
    const currentFav = this.MovieService.getFavorites();
    console.log('current favorites:', currentFav);

    //remove form fav
    this.MovieService.removeFromFavorites(movieId);
    console.log(`removed movie ${movieId} from favorites`);

    //check again
    const isFavAfterRemove = this.MovieService.isFavorite(movieId);
    console.log(
      `is movie ${movieId} favorite after removal?`,
      isFavAfterRemove
    ); //shoudl be false
  }
}

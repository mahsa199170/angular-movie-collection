import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { MovieService } from './movies.services';
import { Movie } from '../models/movie.model';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie',
    year: 2020,
    genre: 'Drama',
    director: 'Jone Doe',
    rating: 8.5,
    description: 'Test desc',
    poster: 'Test.jpg',
  },
];

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all movies', () => {
    service.getMovies().subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0].title).toBe('Test Movie');
    });
    const req = httpMock.expectOne('http://localhost:3000/api/movies');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should search movies', () => {
    service.searchMovies('Test').subscribe((movies) => {
      expect(movies.length).toBe(1);
    });
    const req = httpMock.expectOne(
      (r) =>
        r.url === 'http://localhost:3000/api/movies' &&
        r.params.get('search') === 'Test'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should get movie by id', () => {
    service.getMovieById(1).subscribe((movie) => {
      expect(movie.id).toBe(1);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/movies/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies[0]);
  });

  it('should get genre', () => {
    service.getGenres().subscribe((genres) => {
      expect(genres).toEqual(['Drama']);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/genres');
    expect(req.request.method).toBe('GET');
    req.flush(['Drama']);
  });

  it('should add and remove favorites', () => {
    expect(service.getFavorites()).toEqual([]);
    service.addToFavorites(1);
    expect(service.getFavorites()).toEqual([1]);
    service.removeFromFavorites(1);
    expect(service.getFavorites()).toEqual([]);
  });

  it('should check if movie is favorite', () => {
    service.addToFavorites(1);
    expect(service.isFavorite(1)).toBeTrue();
    service.removeFromFavorites(1);
    expect(service.isFavorite(1)).toBeFalse();
  });
});

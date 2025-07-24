//no service is injected or mocked as this ocmpinet is presentational

import { Movie } from './../../models/movie.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { By } from '@angular/platform-browser';

const mockMovise: Movie[] = [
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
  {
    id: 2,
    title: 'Another Movie',
    year: 2021,
    genre: 'Action',
    director: 'Martin Doe',
    rating: 7.2,
    description: 'Another desc',
    poster: 'Test2.jpg',
  },
];

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent, MovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading state', () => {
    component.loading = true;
    fixture.detectChanges();
    const loading = fixture.nativeElement.querySelector('.loading-container');
    expect(loading).toBeTruthy();
    expect(loading.textContent).toContain('Loading movies');
  });

  it('should show empty state if no movies and not loading', () => {
    component.loading = false;
    component.movies = [];
    fixture.detectChanges();
    const empty = fixture.nativeElement.querySelector('.empty-state');
    expect(empty).toBeTruthy();
    expect(empty.textContent).toContain('No movies found');
  });

  it('should render movie cards when movies are present', () => {
    component.loading = false;
    component.movies = mockMovise;
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(
      By.directive(MovieCardComponent)
    );
    expect(cards.length).toBe(2);
  });

  it('should emit movieSelected when a movie card emits movieClick', () => {
    component.loading = false;
    component.movies = mockMovise;
    fixture.detectChanges();
    spyOn(component.movieSelected, 'emit');
    const card = fixture.debugElement.queryAll(
      By.directive(MovieCardComponent)
    )[0].componentInstance;
    card.movieClick.emit(mockMovise[0]);
    expect(component.movieSelected.emit).toHaveBeenCalledWith(mockMovise[0]);
  });

  it('should emit favoritetoggled when a movie card emits favoriteToggle', () => {
    component.loading = false;
    component.movies = mockMovise;
    fixture.detectChanges();
    spyOn(component.favoriteToggled, 'emit');
    const card = fixture.debugElement.queryAll(
      By.directive(MovieCardComponent)
    )[1].componentInstance;
    card.favoriteToggle.emit(mockMovise[1]);
    expect(component.favoriteToggled.emit).toHaveBeenCalledWith(mockMovise[1]);
  });

  it('should return true for isFavorite if movie is in favorites', () => {
    component.favorites = [1];
    expect(component.isFavorite(1)).toBeTrue();
    expect(component.isFavorite(2)).toBeFalse();
  });
});

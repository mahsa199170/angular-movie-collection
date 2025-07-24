import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { Movie } from '../../models/movie.model';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    year: 2020,
    genre: 'Drama',
    director: 'Jone Doe',
    rating: 8.5,
    description: 'Test desc',
    poster: 'Test.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit movieClick when onMovieClick is called', () => {
    spyOn(component.movieClick, 'emit');
    component.onMovieClick();
    expect(component.movieClick.emit).toHaveBeenCalledWith(mockMovie);
  });

  it('should emit favoriteToggle when onFavoriteToggle is called', () => {
    spyOn(component.favoriteToggle, 'emit');
    const event = new Event('click');
    component.onFavoriteToggle(event);
    expect(component.favoriteToggle.emit).toHaveBeenCalledWith(mockMovie);
  });

  it('should render the movie title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Movie');
  });

  it('should render the favorite button', () => {
    const heart = fixture.nativeElement.querySelector('.heart');
    expect(heart).toBeTruthy();
  });
});

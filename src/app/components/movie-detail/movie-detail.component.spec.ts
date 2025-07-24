//we use a mock movieService to isolate teh component and control data/responses.
//RxJs subjects are used to simulate loading$ and error$ observables from teh service.
import { Movie } from './../../models/movie.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movies.services';
import { of, Subject, throwError } from 'rxjs';

//Mock mo vie data for testing
const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  year: 2020,
  genre: 'Drama',
  director: 'Jone Doe',
  rating: 8.5,
  description: 'Test desc',
  poster: 'Test.jpg',
  cast: ['Actor 1', 'Actor2'],
  runtime: 120,
  language: 'English',
};
describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let mockMovieService: any;
  let mockActivatedRoute: any;
  let mockRouter: any;
  let loadingSubject: Subject<boolean>;
  let errorSubject: Subject<string | null>;

  beforeEach(async () => {
    //Subjects to simulate loading$ and error$ from teh service
    loadingSubject = new Subject<boolean>();
    errorSubject = new Subject<string | null>();
    //mock MOvieService with spies and controlled observables
    mockMovieService = {
      getMovieById: jasmine.createSpy().and.returnValue(of(mockMovie)),
      isFavorite: jasmine.createSpy().and.returnValue(false),
      addToFavorites: jasmine.createSpy(),
      removeFromFavorites: jasmine.createSpy(),
      loading$: loadingSubject.asObservable(),
      error$: errorSubject.asObservable(),
    };

    //To provide route params
    mockActivatedRoute = {
      params: of({ id: 1 }),
    };

    //to spy on navigation
    mockRouter = {
      navigate: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],

      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie on init', () => {
    expect(component.movie).toEqual(mockMovie);
  });

  it('should show laoding state', () => {
    //simulate laoding state and check for loading UI
    loadingSubject.next(true);
    fixture.detectChanges();
    const loading = fixture.nativeElement.querySelector('.loading-container');
    expect(loading).toBeTruthy();
    expect(loading.textContent).toContain('Loading movie details');
  });

  it('should show error state', () => {
    errorSubject.next('Some error');
    loadingSubject.next(false);
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.error-container');
    expect(error).toBeTruthy();
    expect(error.textContent).toContain('Some error');
  });

  it('should call onBack and navigate to root', () => {
    component.onBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call addToFavorites if not favorite', () => {
    mockMovieService.isFavorite.and.returnValue(false);
    component.movie = mockMovie;
    component.onFavoriteToggle();
    expect(mockMovieService.addToFavorites).toHaveBeenCalledWith(mockMovie.id);
  });

  it('should call removefromFavorite if already favorite', () => {
    mockMovieService.isFavorite.and.returnValue(true);
    component.movie = mockMovie;
    component.onFavoriteToggle();
    expect(mockMovieService.removeFromFavorites).toHaveBeenCalledWith(
      mockMovie.id
    );
  });

  it('should set imageError to true on image error', () => {
    expect(component.imageError).toBeFalse();
    component.onImageError();
    expect(component.imageError).toBeTrue();
  });
});

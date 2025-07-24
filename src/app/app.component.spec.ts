import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      //providers: [ MovieServices],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Movie Collection Manager'
    );
  });

  // Unit tests for sorting
  const mockMovies = [
    {
      id: 1,
      title: 'Zed',
      year: 2001,
      genre: 'Drama',
      director: 'Goerge',
      rating: 8.5,
      description: 'Test1',
      poster: 'Test1.jpg',
    },
    {
      id: 2,
      title: 'Apple',
      year: 2000,
      genre: 'Comedy',
      director: 'Julie',
      rating: 6.5,
      description: 'Test2',
      poster: 'Test2.jpg',
    },
    {
      id: 3,
      title: 'Hope',
      year: 2010,
      genre: 'Action',
      director: 'Stephen',
      rating: 7.5,
      description: 'Test3',
      poster: 'Test3.jpg',
    },
  ];

  it('should sort movies by title (A-Z)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.allMovies = [...mockMovies];
    app.selectedSort = 'title';
    app.filterMovies();
    expect(app.filteredMovies.map((m) => m.title)).toEqual([
      'Apple',
      'Hope',
      'Zed',
    ]);
  });

  it('should sort movies by year (ascending)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.allMovies = [...mockMovies];
    app.selectedSort = 'year';
    app.filterMovies();
    expect(app.filteredMovies.map((m) => m.year)).toEqual([2000, 2001, 2010]);
  });

  it('should sort movies by rating (descending)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.allMovies = [...mockMovies];
    app.selectedSort = 'rating';
    app.filterMovies();
    expect(app.filteredMovies.map((m) => m.rating)).toEqual([8.5, 7.5, 6.5]);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListcomponent } from './movie-list.component';

describe('MovieList', () => {
  let component: MovieListcomponent;
  let fixture: ComponentFixture<MovieListcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

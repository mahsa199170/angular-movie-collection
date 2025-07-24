import { Routes } from '@angular/router';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' },
];

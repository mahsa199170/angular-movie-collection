import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class Movies {
  private readonly http = inject(HttpClient);
}

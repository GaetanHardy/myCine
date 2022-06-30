import { Film } from './../model/Film';
import { FilmServiceService } from './../service/film-service.service';
import { Component, OnInit } from '@angular/core';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-films',
  templateUrl: './my-films.component.html',
  styleUrls: ['./my-films.component.scss']
})
export class MyFilmsComponent implements OnInit {

  listFilms: Film[] = [];
  int: number = 0;

  private _filmsUrl = 'http://localhost:3000/film';

  constructor(private filmService: FilmServiceService, private router: Router, private _httpClient: HttpClient) { this.listFilms = []; }

  ngOnInit(): void {
    this._httpClient.get<Film[]>(this._filmsUrl)
            .subscribe(films => {

              this.listFilms = films.map(item => ({
                id: item.id,
                titre: item.titre,
                synopsis: item.synopsis,
                note: item.note
              }));
            });        
  }

  ngOnDelete(id: number): void {
    this._filmsUrl = 'http://localhost:3000/film/' + id.toString();
    this._httpClient.delete(this._filmsUrl)
            .subscribe(films => {
              this.router.navigate(['/'])
                .then(() => {
                  window.location.reload();
                });
            });     
  }
}

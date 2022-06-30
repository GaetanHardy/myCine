import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../model/Film';
import { FilmServiceService } from '../service/film-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {

  film: Film | undefined;
  private id = this.route.snapshot.paramMap.get('id');
  private _filmsUrl = 'http://localhost:3000/film/' + this.id;

  constructor(private filmService: FilmServiceService, private router: Router, private route: ActivatedRoute, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this._httpClient.get<Film>(this._filmsUrl)
            .subscribe(films => {
              this.film = films;
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


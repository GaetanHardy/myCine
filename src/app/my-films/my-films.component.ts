import { FilmServiceService } from './../service/film-service.service';
import { Component, OnInit } from '@angular/core';
import { Film } from '../model/Film';

@Component({
  selector: 'app-my-films',
  templateUrl: './my-films.component.html',
  styleUrls: ['./my-films.component.scss']
})
export class MyFilmsComponent implements OnInit {

  listFilms: Film[] = [];
  constructor(private filmService: FilmServiceService) { }

  ngOnInit(): void {
    this.listFilms = this.filmService.getFilms();
  }
  

}

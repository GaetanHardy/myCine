import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../model/Film';
import { FilmServiceService } from '../service/film-service.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {

  film: Film | undefined;
  constructor(private filmService: FilmServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const titre = this.route.snapshot.paramMap.get('titreFilm');
    if(titre != null) this.film = this.filmService.getFilmDetails(titre.split("-").join(" "));
  }
}

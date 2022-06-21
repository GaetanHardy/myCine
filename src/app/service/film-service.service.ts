import { Injectable } from '@angular/core';
import { Film } from '../model/Film';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FilmServiceService {

  private supabase: SupabaseClient;

  listFilms : Film[] = [
    { 
      titre: "Le roi Lion",
      synopsis: "C'est un lion et son père il meurt",
      note: 4
    },
    {
      titre: "Lilo et Stitch",
      synopsis: "Best film ever, trop bonnes vibes",
      note: 5
    }
  ];

  constructor() { this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey); }

  addFilm(film: Film): void {
    this.listFilms.push(film);
  }

  getFilms() {
    return this.supabase
    .from<Film[]>('film')
    .select(`titre, synopsis, note`);
  }

  getFilmDetails(titre : String): Film | any {
    return this.listFilms.find(film => film.titre == titre);
  }

  setFilm(film: Film): void {
    this.listFilms.forEach(function(item){
      if(item.titre === film.titre) {
        item.titre = film.titre;
        item.synopsis = film.synopsis;
        item.note = film.note;
      }
    });
  }
}

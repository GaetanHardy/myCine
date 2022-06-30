import { Injectable } from '@angular/core';
import { Film } from '../model/Film';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilmServiceService {

  private supabase: SupabaseClient;

  listFilms : Film[] = []

  constructor() { this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey); }

  addFilm(titre: string, synopsis: string, note: number) {
    return from(this.supabase
      .from<Film>('film')
      .insert({titre: titre, synopsis: synopsis, note: note})
    );
  };

  getFilms() {
    return from(this.supabase
    .from<Film>('film')
    .select(`id, titre, synopsis, note`)).pipe(
      map(res => res.data)
    );
  }

  getFilmDetails(id : number) {
    return from(this.supabase
      .from<Film>('film')
      .select('id, titre, synopsis, note')).pipe(
        map(res => res.data),
        map(films => {
          return films?.find(f => f.id == id);
        })
      )
  }

  setFilm(film: Film) {
    return from(this.supabase
      .from<Film>('film')
      .update({titre: film.titre, synopsis: film.synopsis, note: film.note})
      .match({id: film.id})
    );
  }
}

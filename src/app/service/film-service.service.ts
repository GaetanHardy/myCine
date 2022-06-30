import { Injectable } from '@angular/core';
import { Film } from '../model/Film';
import {AuthChangeEvent, createClient, Session, SupabaseClient} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilmServiceService {

}

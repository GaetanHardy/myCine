import { FilmDetailsComponent } from './film-details/film-details.component';
import { AddOrEditFilmComponent } from './add-or-edit-film/add-or-edit-film.component';
import { MyFilmsComponent } from './my-films/my-films.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MyFilmsComponent },
  { path: 'addOrEdit', component: AddOrEditFilmComponent },
  { path: 'addOrEdit/:id/:titreFilm', component: AddOrEditFilmComponent},
  { path: 'detailsFilm/:id/:titreFilm', component: FilmDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Film } from './../model/Film';
import { FilmServiceService } from './../service/film-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-or-edit-film',
  templateUrl: './add-or-edit-film.component.html',
  styleUrls: ['./add-or-edit-film.component.scss']
})
export class AddOrEditFilmComponent implements OnInit {

  film: Film | undefined;


  AddOrEditForm = new FormGroup({
    titre: new FormControl<string | null | undefined>('', Validators.required),
    synopsis: new FormControl(),
    note: new FormControl<number | undefined | null>(null, [Validators.min(0), Validators.max(5)])
  });

  constructor(private filmService: FilmServiceService, private router: Router, private route: ActivatedRoute, private _httpClient: HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      const _filmsUrl = 'http://localhost:3000/film/' + id;
      console.log(_filmsUrl);
      this._httpClient.get<Film>(_filmsUrl)
      .subscribe(films => {
        this.film = films;
        this.AddOrEditForm.setValue({titre: this.film?.titre, synopsis: this.film?.synopsis, note: this.film?.note});
      });    
    }
  }
    

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if(id) {
      if(this.film && this.AddOrEditForm.value.titre != null)  {
        const _filmsUrl = 'http://localhost:3000/film/' + id;
        this._httpClient.put<Film>(_filmsUrl, this.AddOrEditForm.value)
            .subscribe(films => {
              this.router.navigate(["/"]);
            });  
      };
      
    } else {
      if(this.AddOrEditForm.value.titre != undefined && this.AddOrEditForm.value.note != undefined) {
          const _filmsUrl = 'http://localhost:3000/film';
          this._httpClient.post<Film>(_filmsUrl, this.AddOrEditForm.value)
              .subscribe(films => {
                this.router.navigate(["/"]);
              });  
        };
    }
    
  }
}

export class ReactiveFormComponent {
  
}


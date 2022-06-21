import { Film } from './../model/Film';
import { FilmServiceService } from './../service/film-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-or-edit-film',
  templateUrl: './add-or-edit-film.component.html',
  styleUrls: ['./add-or-edit-film.component.scss']
})
export class AddOrEditFilmComponent implements OnInit {

  film: Film | undefined;
  AddOrEditForm = new FormGroup({
    titre: new FormControl('', Validators.required),
    synopsis: new FormControl(),
    note: new FormControl<number | null>(null, [Validators.min(0), Validators.max(5)])
  });

  constructor(private filmService: FilmServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const titre = this.route.snapshot.paramMap.get('titreFilm');
    if(titre != null) {
      console.log(titre.split("-").join(" "));
      this.film = this.filmService.getFilmDetails(titre.split("-").join(" "));
      if(this.film) this.AddOrEditForm.setValue({titre: this.film.titre, synopsis: this.film.synopsis, note: this.film.note});
    }
  }

  onSubmit() {
    const titre = this.route.snapshot.paramMap.get('titreFilm');
    
    if(titre) {
      this.film = this.filmService.getFilmDetails(titre.split("-").join(" "));
      if(this.film) this.filmService.setFilm(this.AddOrEditForm.value as Film);
      this.router.navigate(["/"]);
    }  else {
      if(this.AddOrEditForm.value.titre != '') {
        this.filmService.addFilm(this.AddOrEditForm.value as Film);
        this.router.navigate(["/"]);
      }
    }
    
  }
}

export class ReactiveFormComponent {
  
}


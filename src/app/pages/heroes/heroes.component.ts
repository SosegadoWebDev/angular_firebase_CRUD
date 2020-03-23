import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';

import { HeroeModel } from 'src/app/models/heroe-model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Array<HeroeModel> = [];
    isLoading = false;

    constructor(
        private heroesService: HeroesService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.heroesService.getHeroes().subscribe(resp => {
            this.heroes = resp;
            this.isLoading = false;
        });
    }

    deleteHeroe(heroe: HeroeModel, index) {
        Swal.fire({
            title: '¿Está seguro?',
            text: `Está seguro que desea borrar a ${heroe.nombre}`,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then(resp => {
            if (resp.value) {
                this.heroes.splice(index, 1);
                this.heroesService.deleteHeroe(heroe.id).subscribe();
            }
        });
    }
}

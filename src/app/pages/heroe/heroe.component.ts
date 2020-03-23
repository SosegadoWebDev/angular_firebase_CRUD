import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

import { HeroesService } from './../../services/heroes.service';
import { HeroeModel } from './../../models/heroe-model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-heroe',
    templateUrl: './heroe.component.html',
    styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

    heroe: HeroeModel = new HeroeModel();

    constructor(
        private heroesService: HeroesService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');

        if (id !== 'nuevo') {
            this.heroesService.getHeroe(id).subscribe(
                (resp: HeroeModel) => {
                    this.heroe = resp;
                    this.heroe.id = id;
                }, error => {
                    console.log(error);
                }, () => {
                    console.log('finished');
                });
        }
    }

    save(form: NgForm): void {
        if (form.invalid) {
            return;
        }

        Swal.fire({
            title: 'Espere',
            text: 'Guardando información',
            icon: 'info',
            allowOutsideClick: false
        });
        Swal.showLoading();

        if (this.heroe.id) {
            this.heroesService.actualizarHeroe(this.heroe).subscribe(resp => {
                Swal.fire({
                    title: this.heroe.nombre,
                    text: 'Se actualizó correctamente',
                    icon: 'success',
                    timer: 5000
                });
            });
        } else {
            this.heroesService.crearHeroe(this.heroe)
                .toPromise()
                .then(resp => {
                    console.log(resp);
                })
                .finally(() => {
                    console.log('finished');
                    Swal.fire({
                        title: this.heroe.nombre,
                        text: 'Se actualizó correctamente',
                        icon: 'success',
                        timer: 5000
                    });
                });
        }
    }
}

import { HeroeModel } from './../models/heroe-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeroesService {

    private endPoint = 'https://crud-firebase-b3f95.firebaseio.com';

    constructor(
        private http: HttpClient
    ) { }

    crearHeroe(heroe: HeroeModel): Observable<any> {
        return this.http.post(`${this.endPoint}/heroes.json`, heroe)
            .pipe(
                map((resp: any) => {
                    heroe.id = resp.name;
                    return heroe;
                })
            );
    }

    actualizarHeroe(heroe: HeroeModel) {
        const heroeTemp = {
            ...heroe
        };
        delete heroeTemp.id;
        return this.http.put(`${this.endPoint}/heroes/${heroe.id}.json`, heroeTemp);
    }

    getHeroe(id: string) {
        return this.http.get(`${this.endPoint}/heroes/${id}.json`);
    }

    getHeroes() {
        return this.http.get(`${this.endPoint}/heroes.json`)
            .pipe(
                delay(1500),
                map(resp => this.crearArreglo(resp))
            );
    }

    deleteHeroe(id: string) {
        return this.http.delete(`${this.endPoint}/heroes/${id}.json`);
    }

    private crearArreglo(heroesObj: object) {
        if (heroesObj === null) {
            return [];
        }

        const heroes: Array<HeroeModel> = [];
        Object.keys(heroesObj).forEach(key => {
            const heroe: HeroeModel = heroesObj[key];
            heroe.id = key;
            heroes.push(heroe);
        });

        return heroes;
    }
}

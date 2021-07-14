import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, repeat } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {


  private url = 'https://fb-crud-576cb-default-rtdb.firebaseio.com'
  constructor( private http: HttpClient) { }

  crearHeroe( heroe: HeroeModel ) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map( (resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe( heroe: HeroeModel) {

    const heroTemp = {
      ...heroe
    }

    delete heroTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroTemp)
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map( this.crearArreglo )
      )
  }

  private crearArreglo( heroesObj: any) {

    const heroes: HeroeModel[] = [];
    if( heroesObj === null) {
      return [];
    }else {
      Object.keys(heroesObj).forEach( key => {
        const heroe: HeroeModel = heroesObj[key];
        heroe.id = key;
  
        heroes.push(heroe);
      });
      return heroes;
    }
  } 
}

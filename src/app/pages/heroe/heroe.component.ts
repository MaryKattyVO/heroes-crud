import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../service/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel();

  constructor( private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar( form: NgForm) {

    if( form.invalid) {
      console.log('Formulario no valido')
      return;
    }
    Swal.showLoading();

    let peticion: Observable<any>;

    if( this.heroe.id) {
      peticion = this.heroeService.actualizarHeroe(this.heroe);
        
    } else {
      peticion = this.heroeService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
    })
    
  }
}

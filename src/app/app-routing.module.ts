import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HeroesComponent } from './pages/heroes/heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroeComponent},
  { path: 'heroe/:id', component: HeroesComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'heroes'},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';

import { PersonasNuevasComponent } from './pages/personas-nuevas/personas-nuevas.component';
import { ConocenosComponent } from './pages/conocenos/conocenos.component';
import { ActividadesEspecialesComponent } from './pages/actividades-especiales/actividades-especiales.component';
import { EducacionCristianaComponent } from './pages/educacion-cristiana/educacion-cristiana.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'personasNuevas',
    component: PersonasNuevasComponent,
  },
  {
    path: 'actividadesEspeciales',
    component: ActividadesEspecialesComponent,
  },
  {
    path: 'educacionCristiana',
    component: EducacionCristianaComponent,
  },
  {
    path: 'conocenos',
    component: ConocenosComponent,
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NoEncontradoComponent,
  },
];

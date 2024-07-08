import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { IngresoComponent } from './pages/ingreso/ingreso.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';
import { PrincipalComponent } from './pages/principal/principal.component';
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
    path: 'principal',
    component: PrincipalComponent,
  },
  {
    path: 'ingreso',
    component: IngresoComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
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

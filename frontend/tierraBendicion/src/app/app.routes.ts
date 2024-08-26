import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';

import { PersonasNuevasComponent } from './pages/personas-nuevas/personas-nuevas.component';
import { ActividadesEspecialesComponent } from './pages/actividades-especiales/actividades-especiales.component';
import { EducacionCristianaComponent } from './pages/educacion-cristiana/educacion-cristiana.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdministracionUsuariosComponent } from './pages/administracion-usuarios/administracion-usuarios.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'miembros',
    component: PersonasNuevasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'actividadesEspeciales',
    component: ActividadesEspecialesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'administracionUsuarios',
    component: AdministracionUsuariosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'educacionCristiana',
    component: EducacionCristianaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [authGuard],
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

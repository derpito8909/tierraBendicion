import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NoEncontradoComponent } from './pages/no-encontrado/no-encontrado.component';

import { PersonasNuevasComponent } from './pages/personas-nuevas/personas-nuevas.component';
import { ActividadesEspecialesComponent } from './pages/actividades-especiales/actividades-especiales.component';
import { EducacionCristianaComponent } from './pages/educacion-cristiana/educacion-cristiana.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdministracionUsuariosComponent } from './pages/administracion-usuarios/administracion-usuarios.component';
import { NuevoUsuarioComponent } from './pages/administracion-usuarios/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './pages/administracion-usuarios/editar-usuario/editar-usuario.component';
import { CrearPersonasComponent } from './pages/personas-nuevas/crear-personas/crear-personas.component';
import { ListaPersonasComponent } from './pages/personas-nuevas/lista-personas/lista-personas.component';
import { CrearActividadComponent } from './pages/actividades-especiales/crear-actividad/crear-actividad.component';
import { ListarActividadComponent } from './pages/actividades-especiales/listar-actividad/listar-actividad.component';
import { CrearCursosComponent } from './pages/educacion-cristiana/crear-cursos/crear-cursos.component';
import { ListarCursosComponent } from './pages/educacion-cristiana/listar-cursos/listar-cursos.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { CambiarContrasenaComponent } from './pages/perfil-usuario/cambiar-contrasena/cambiar-contrasena.component';
import { authGuard } from './guards/auth.guard';
import { rolAuthGuard } from './guards/rol-auth.guard';

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
    path: 'miembros/nuevo',
    component: CrearPersonasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'miembros/list',
    component: ListaPersonasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'miembros/edit/:id',
    component: CrearPersonasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'actividadesEspeciales',
    component: ActividadesEspecialesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'actividadesEspeciales/list',
    component: ListarActividadComponent,
    canActivate: [authGuard],
  },
  {
    path: 'actividadesEspeciales/nuevo',
    component: CrearActividadComponent,
    canActivate: [authGuard],
  },
  {
    path: 'actividadesEspeciales/edit/:id',
    component: CrearActividadComponent,
    canActivate: [authGuard],
  },
  {
    path: 'administracionUsuarios',
    component: AdministracionUsuariosComponent,
    canActivate: [authGuard, rolAuthGuard],
  },
  {
    path: 'administracionUsuarios/nuevo',
    component: NuevoUsuarioComponent,
    canActivate: [authGuard, rolAuthGuard],
  },
  {
    path: 'administracionUsuarios/edit/:id',
    component: EditarUsuarioComponent,
    canActivate: [authGuard, rolAuthGuard],
  },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'perfil/cambiarContrasena',
    component: CambiarContrasenaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'educacionCristiana',
    component: EducacionCristianaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'educacionCristiana/curso/nuevo',
    component: CrearCursosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'educacionCristiana/curso/list',
    component: ListarCursosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'educacionCristiana/curso/edit/:id',
    component: CrearCursosComponent,
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

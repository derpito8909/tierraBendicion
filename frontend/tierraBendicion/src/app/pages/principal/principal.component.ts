import { Component } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { PiePaginaComponent } from '../../components/pie-pagina/pie-pagina.component';
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavegacionComponent, PiePaginaComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent {}

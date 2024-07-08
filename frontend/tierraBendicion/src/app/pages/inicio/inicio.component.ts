import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PiePaginaComponent } from '../../components/pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, PiePaginaComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {}

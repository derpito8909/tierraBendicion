import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';

@Component({
  selector: 'app-administracion-usuarios',
  standalone: true,
  imports: [NavegacionComponent],
  templateUrl: './administracion-usuarios.component.html',
  styleUrl: './administracion-usuarios.component.css',
})
export class AdministracionUsuariosComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log('PrincipalComponent initialized');
  }
  ngOnDestroy(): void {
    console.log('PrincipalComponent destroyed');
  }
}

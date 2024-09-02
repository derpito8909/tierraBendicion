import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividades-especiales',
  standalone: true,
  imports: [NavegacionComponent, RouterLink, CommonModule],
  templateUrl: './actividades-especiales.component.html',
  styleUrl: './actividades-especiales.component.css',
})
export class ActividadesEspecialesComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log('PrincipalComponent initialized');
  }
  ngOnDestroy(): void {
    console.log('PrincipalComponent destroyed');
  }
}

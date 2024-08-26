import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-educacion-cristiana',
  standalone: true,
  imports: [NavegacionComponent, RouterLink],
  templateUrl: './educacion-cristiana.component.html',
  styleUrl: './educacion-cristiana.component.css',
})
export class EducacionCristianaComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log('PrincipalComponent initialized');
  }
  ngOnDestroy(): void {
    console.log('PrincipalComponent destroyed');
  }
}

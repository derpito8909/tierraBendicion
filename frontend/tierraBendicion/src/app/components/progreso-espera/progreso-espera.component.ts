import { Component, OnInit, inject } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progreso-espera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progreso-espera.component.html',
  styleUrls: ['./progreso-espera.component.css'],
})
export class ProgresoEsperaComponent implements OnInit {
  showLoader: boolean = false;

  private router = inject(Router);
  ngOnInit(): void {
    console.log('progresa componente empezo');
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.showLoader = true;
        console.log('comenzo la hola', this.showLoader);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        console.log('termino la hola', event);
        this.showLoader = false;
      }
    });
  }
}

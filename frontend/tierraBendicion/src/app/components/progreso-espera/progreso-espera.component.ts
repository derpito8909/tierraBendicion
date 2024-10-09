import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Input } from '@angular/core';

@Component({
  selector: 'app-progreso-espera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progreso-espera.component.html',
  styleUrls: ['./progreso-espera.component.css'],
})
export class ProgresoEsperaComponent {
  @Input() showLoader: boolean = false;
}

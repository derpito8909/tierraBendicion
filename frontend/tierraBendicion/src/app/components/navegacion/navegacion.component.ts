import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { ProgresoEsperaComponent } from '../progreso-espera/progreso-espera.component';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterLink, CommonModule, ProgresoEsperaComponent, MatMenuModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css',
})
export class NavegacionComponent implements OnInit, OnDestroy {
  private loginService = inject(LoginService);

  closeSession(): void {
    this.loginService.logout();
  }

  accessUserAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  getNameUser(): string {
    return this.loginService.getNameUser();
  }
  getRolUser(): string {
    return this.loginService.getRolUser();
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}

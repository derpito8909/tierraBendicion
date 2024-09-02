import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { LoginService } from '../../services/login.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NavegacionComponent, RouterLink, CommonModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit, OnDestroy {
  private loginService = inject(LoginService);

  ngOnInit(): void {
    console.log('PrincipalComponent initialized');
  }
  ngOnDestroy(): void {
    console.log('PrincipalComponent destroyed');
  }

  getNameUser(): string {
    return this.loginService.getNameUser();
  }
  accessUserAdmin(): boolean {
    return this.loginService.isAdmin();
  }
}

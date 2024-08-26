import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-personas-nuevas',
  standalone: true,
  imports: [NavegacionComponent, RouterLink, CommonModule],
  templateUrl: './personas-nuevas.component.html',
  styleUrl: './personas-nuevas.component.css',
})
export class PersonasNuevasComponent implements OnInit, OnDestroy {
  private loginService = inject(LoginService);
  ngOnInit(): void {
    console.log('PrincipalComponent initialized');
  }
  ngOnDestroy(): void {
    console.log('PrincipalComponent destroyed');
  }

  accessUserAdmin(): boolean {
    return this.loginService.isAdmin();
  }
}

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { Users } from '../../interfaces/users';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-administracion-usuarios',
  standalone: true,
  imports: [NavegacionComponent],
  templateUrl: './administracion-usuarios.component.html',
  styleUrl: './administracion-usuarios.component.css',
})
export class AdministracionUsuariosComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private userSubscription: Subscription | null = null;
  errorMessage: string | null = null;
  users: Users[] = [];

  ngOnInit(): void {
    this.getAllUser();
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe;
  }

  getAllUser(): void {
    this.userSubscription = this.apiService.getAll<Users>('users').subscribe({
      next: (res: Users[]) => {
        if (res) {
          this.users = res;
          console.log('lista de usuarios', this.users);
        }
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }
}

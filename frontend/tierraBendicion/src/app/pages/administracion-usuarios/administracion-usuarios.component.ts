import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { Users } from '../../interfaces/users';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { GenericTableComponent } from '../../components/generic-table/generic-table.component';

@Component({
  selector: 'app-administracion-usuarios',
  standalone: true,
  imports: [NavegacionComponent, RouterLink, GenericTableComponent],
  templateUrl: './administracion-usuarios.component.html',
  styleUrl: './administracion-usuarios.component.css',
})
export class AdministracionUsuariosComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private subscription: Subscription | null = null;
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  errorMessage: string | null = null;
  users: Users[] = [];
  displayedColumns = [
    { key: 'fullname', label: 'Nombre' },
    { key: 'email', label: 'Correo Electronico' },
    { key: 'category', label: 'categoria' },
  ];

  ngOnInit(): void {
    this.getAllUser();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  getAllUser(): void {
    this.subscription = this.apiService.getAll<Users>('users').subscribe({
      next: (res: Users[]) => {
        if (res) {
          this.users = res;
        }
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }

  // Método para manejar los eventos de acción
  handleAction(event: { action: string; element: Users }) {
    if (event.action === 'edit') {
      this.editUser(event.element._id);
    } else if (event.action === 'delete') {
      this.deleteUser(event.element._id);
    }
  }

  editUser(id: string) {
    this.router.navigate([`/administracionUsuarios/edit/${id}`]);
  }

  deleteUser(id: string): void {
    this.subscription = this.notificationService
      .confirm(
        '¿Estás seguro de que quieres eliminar este item?',
        'Confirmar Eliminación'
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.subscription = this.apiService.delete('users', id).subscribe({
            next: (res) => {
              this.getAllUser();
              this.notificationService.showSuccess(
                'Item Eliminado Correctamente'
              );
            },
            error: (err) => {
              this.errorMessage = err.message;
            },
          });
        }
      });
  }
  addUser() {
    this.router.navigate(['/administracionUsuarios/nuevo']);
  }
}

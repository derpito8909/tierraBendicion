import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
//importaciones internas
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
NavegacionComponent;
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';
import { Members } from '../../../interfaces/members';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-lista-personas',
  standalone: true,
  imports: [NavegacionComponent, GenericTableComponent, RouterLink],
  templateUrl: './lista-personas.component.html',
  styleUrl: './lista-personas.component.css',
})
export class ListaPersonasComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private subscription: Subscription | null = null;
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private loginService = inject(LoginService);

  errorMessage: string | null = null;
  members: Members[] = [];
  displayedColumns = [
    { key: 'fullname', label: 'Nombre Completo' },
    { key: 'cellPhoneNumber', label: 'Telefono' },
    { key: 'course', label: 'Ultimo curso Realizado' },
    { key: 'isActive', label: 'Activo' },
  ];

  ngOnInit(): void {
    this.getAllMembers();
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe;
  }

  getAllMembers(): void {
    this.subscription = this.apiService.getAll<Members>('members').subscribe({
      next: (res) => {
        if (res) {
          this.members = res;
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
  }

  // Método para manejar los eventos de acción
  handleAction(event: { action: string; element: Members }) {
    if (event.action === 'edit') {
      this.editMember(event.element._id);
    } else if (event.action === 'delete') {
      this.deleteMember(event.element._id);
    }
  }
  editMember(id: string) {
    if (this.accessUserAdmin()) {
      this.router.navigate([`/miembros/edit/${id}`]);
    } else {
      this.notificationService.showError('no tienes permisos');
    }
  }

  deleteMember(id: string): void {
    if (this.accessUserAdmin()) {
      this.subscription = this.notificationService
        .confirm(
          '¿Estás seguro de que quieres deshabilitar este item?',
          'Confirmar Eliminación'
        )
        .subscribe((confirmed) => {
          if (confirmed) {
            this.subscription = this.apiService
              .delete('members', id)
              .subscribe({
                next: (res) => {
                  this.getAllMembers();
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
    } else {
      this.notificationService.showError('no tienes permisos');
    }
  }

  accessUserAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  accessUserLeader(): boolean {
    return this.loginService.isLeader();
  }
}

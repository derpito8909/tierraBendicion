//importaciones externas
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
//importaciones internas
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';
import { Activity } from '../../../interfaces/activity';
import { LoginService } from '../../../services/login.service';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';

@Component({
  selector: 'app-listar-actividad',
  standalone: true,
  imports: [NavegacionComponent, RouterLink, GenericTableComponent],
  templateUrl: './listar-actividad.component.html',
  styleUrl: './listar-actividad.component.css',
})
export class ListarActividadComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private loginService = inject(LoginService);

  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  AllActivities: Activity[] = [];
  displayedColumns = [
    { key: 'name', label: 'Nombre' },
    { key: 'date', label: 'Fecha' },
    { key: 'attendance', label: 'Personas que asistieron' },
    { key: 'user', label: 'Lider a cargo' },
  ];

  ngOnInit(): void {
    this.getAllActivities();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllActivities(): void {
    this.apiService
      .getAll<Activity>('activities')
      .pipe(
        takeUntil(this.destroy$),
        map((activities: Activity[]) =>
          activities.map((activity: Activity) => {
            return {
              ...activity,
              date: new Date(activity.date),
            };
          })
        )
      )
      .subscribe({
        next: (activities) => {
          if (activities) {
            this.AllActivities = activities;
          }
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }

  // Método para manejar los eventos de acción
  handleAction(event: { action: string; element: Activity }) {
    if (event.action === 'edit') {
      this.editActivity(event.element._id);
    } else if (event.action === 'delete') {
      this.deleteActivity(event.element._id);
    }
  }

  editActivity(id: string) {
    if (this.accessUserAdmin()) {
      this.router.navigate([`/actividadesEspeciales/edit/${id}`]);
    } else {
      this.notificationService.showError('no tiene permisos');
    }
  }
  deleteActivity(id: string): void {
    if (this.accessUserAdmin()) {
      this.notificationService
        .confirm(
          '¿Estás seguro de que quieres deshabilitar este item?',
          'Confirmar Eliminación'
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((confirmed) => {
          if (confirmed) {
            this.apiService
              .delete('activities', id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (res) => {
                  this.getAllActivities();
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
      this.notificationService.showError('no tiene permisos');
    }
  }

  accessUserAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  accessUserLeader(): boolean {
    return this.loginService.isLeader();
  }
}

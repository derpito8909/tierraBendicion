//importaciones externas
import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//importaciones internas
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';
import { Activity } from '../../../interfaces/activity';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listar-actividad',
  standalone: true,
  imports: [
    NavegacionComponent,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './listar-actividad.component.html',
  styleUrl: './listar-actividad.component.css',
})
export class ListarActividadComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private apiService = inject(ApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private loginService = inject(LoginService);

  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  AllActivities: Activity[] = [];
  displayedColumns: string[] = ['name', 'date', 'attendance', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Activity>([]);
  //logica de paginacion
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

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
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (activities) => {
          if (activities) {
            this.AllActivities = activities;
            console.log(this.AllActivities);
            this.dataSource = new MatTableDataSource(activities);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  accessUserAdmin(): boolean {
    return this.loginService.isAdmin();
  }

  accessUserLeader(): boolean {
    return this.loginService.isLeader();
  }
}

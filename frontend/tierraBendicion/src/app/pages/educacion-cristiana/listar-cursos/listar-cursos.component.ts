//importaciones externas
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';

//importaciones internas
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';
import { Courses } from '../../../interfaces/courses';
import { LoginService } from '../../../services/login.service';
import { GenericTableComponent } from '../../../components/generic-table/generic-table.component';

@Component({
  selector: 'app-listar-cursos',
  standalone: true,
  imports: [NavegacionComponent, RouterLink, GenericTableComponent],
  templateUrl: './listar-cursos.component.html',
  styleUrl: './listar-cursos.component.css',
})
export class ListarCursosComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private loginService = inject(LoginService);

  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  AllCourses: Courses[] = [];
  displayedColumns = [
    { key: 'name', label: 'Nombre' },
    { key: 'dateStart', label: 'Fecha Inicio' },
    { key: 'dateEnd', label: 'Fecha final' },
    { key: 'user', label: 'Profesor a cargo' },
  ];

  ngOnInit(): void {
    this.getAllCourses();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllCourses(): void {
    this.apiService
      .getAll<Courses>('courses')
      .pipe(
        takeUntil(this.destroy$),
        map((courses: Courses[]) =>
          courses.map((course: Courses) => {
            return {
              ...course,
              dateStart: new Date(course.dateStart),
              dateEnd: new Date(course.dateEnd),
            };
          })
        )
      )
      .subscribe({
        next: (courses: Courses[]) => {
          if (courses) {
            this.AllCourses = courses;
          }
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }

  // Método para manejar los eventos de acción
  handleAction(event: { action: string; element: Courses }) {
    if (event.action === 'edit') {
      this.editCourses(event.element._id);
    } else if (event.action === 'delete') {
      this.deleteCourses(event.element._id);
    }
  }

  editCourses(id: string) {
    if (this.accessUserAdmin()) {
      this.router.navigate([`/educacionCristiana/curso/edit/${id}`]);
    } else {
      this.notificationService.showError('no tiene permisos');
    }
  }
  deleteCourses(id: string): void {
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
              .delete('courses', id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (res) => {
                  this.getAllCourses();
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

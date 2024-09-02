import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';
import { Users } from '../../interfaces/users';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-administracion-usuarios',
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
  templateUrl: './administracion-usuarios.component.html',
  styleUrl: './administracion-usuarios.component.css',
})
export class AdministracionUsuariosComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private apiService = inject(ApiService);
  private subscription: Subscription | null = null;
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  errorMessage: string | null = null;
  users: Users[] = [];
  displayedColumns: string[] = [
    'fullname',
    'email',
    'category',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Users>([]);
  selection = new SelectionModel<Users>(true, []);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

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
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

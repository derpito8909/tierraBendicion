import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
NavegacionComponent;
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';
import { Members } from '../../../interfaces/members';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-lista-personas',
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
  templateUrl: './lista-personas.component.html',
  styleUrl: './lista-personas.component.css',
})
export class ListaPersonasComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private apiService = inject(ApiService);
  private subscription: Subscription | null = null;
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private loginService = inject(LoginService);

  errorMessage: string | null = null;
  members: Members[] = [];
  displayedColumns: string[] = [
    'fullname',
    'cellPhoneNumber',
    'isActive',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Members>([]);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

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
          console.log(res);
          this.members = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
      },
    });
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

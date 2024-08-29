import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private dialog = inject(MatDialog);

  showError(message: string, title: string = 'Error'): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
        isConfirmDialog: false,
      },
    });
  }
  showSuccess(message: string, title: string = 'Exito'): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
        isConfirmDialog: false,
      },
    });
  }

  confirm(message: string, title: string = 'Confirmar'): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
        isConfirmDialog: true,
      },
    });

    return dialogRef.afterClosed();
  }
}

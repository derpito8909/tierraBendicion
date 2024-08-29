import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.css',
})
export class NoEncontradoComponent implements OnInit {
  private location = inject(Location);
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.notificationService.showError(
      'Lo sentimos, la página que estás buscando no existe.'
    );
    setTimeout(() => {
      this.location.back();
    }, 2000);
  }
}

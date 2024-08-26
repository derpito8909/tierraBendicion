import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.css',
})
export class NoEncontradoComponent implements OnInit {
  ngOnInit(): void {}
  private location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}

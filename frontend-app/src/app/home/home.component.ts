import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1>Bienvenido al sistema</h1>
      <p>Seleccione una opción:</p>
      <nav>
        <a routerLink="/notificaciones" class="btn">Ver Notificaciones</a>
        <a routerLink="/licencias" class="btn">Ver Licencias</a>
      </nav>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      margin-top: 40px;
    }
    .btn {
      display: inline-block;
      margin: 10px;
      padding: 10px 20px;
      background-color: #1976d2;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
    .btn:hover {
      background-color: #1565c0;
    }
  `]
})
export class HomeComponent {}

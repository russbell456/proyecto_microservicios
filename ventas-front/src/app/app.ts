import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { VentaFormComponent } from './venta-form/venta-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VentaFormComponent],
  template: `
    <h1>Registro de Ventas</h1>
    <app-venta-form></app-venta-form>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent);

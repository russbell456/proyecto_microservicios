import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../core/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-cliente.component.html',
  styleUrl: './login-cliente.component.scss',
})
export class LoginClienteComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { correo, dni } = this.loginForm.value;
      this.clienteService.loginCliente(correo, dni).subscribe({
        next: (cliente) => {
          localStorage.setItem('cliente', JSON.stringify(cliente)); // Guardar datos de sesión
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/catalogo']); // Redirigir al catálogo
        },
        error: (err) => alert('Credenciales incorrectas o error de red.')
      });
    }
  }
}

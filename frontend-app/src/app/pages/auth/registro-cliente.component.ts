import { Component } from '@angular/core';
import { ClienteService } from '../../core/services/cliente.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.scss',
})
export class RegistroClienteComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.formulario = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  registrar() {
    if (this.formulario.valid) {
      this.clienteService.registrarCliente(this.formulario.value).subscribe({
        next: (res) => alert('Cliente registrado correctamente'),
        error: (err) => alert('Error al registrar cliente: ' + err.error.message)
      });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}

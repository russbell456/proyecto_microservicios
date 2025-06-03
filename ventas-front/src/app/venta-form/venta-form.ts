import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './venta-form.html',
  styleUrls: ['./venta-form.css']
})
export class VentaFormComponent implements OnInit {
  ventaForm!: FormGroup;
  mensaje = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.ventaForm = this.fb.group({
      clienteId: ['', Validators.required],
      fecha: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      estado: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.ventaForm.invalid) {
      this.mensaje = 'Completa todos los campos correctamente.';
      return;
    }

    this.http.post('http://localhost:8080/ventas', this.ventaForm.value).subscribe({
      next: () => this.mensaje = 'Venta registrada exitosamente.',
      error: err => this.mensaje = 'Error: ' + err.message
    });
  }
}

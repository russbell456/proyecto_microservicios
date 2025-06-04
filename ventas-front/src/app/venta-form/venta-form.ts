import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
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
  ventaForm!: FormGroup; // Declaramos pero no inicializamos aquí
  mensaje = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    // Inicializamos el formulario aquí, porque fb ya está listo
    this.ventaForm = this.fb.group({
      clienteId: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      estado: ['', Validators.required],
      detalles: this.fb.array([]),
      pagos: this.fb.array([]),
      total: [{ value: 0, disabled: true }]
    });

    // Agrega al menos un detalle y pago vacío para empezar
    this.addDetalle();
    this.addPago();

    // Puedes suscribirte a cambios para recalcular el total, subtotal, etc.
  }

  get detalles(): FormArray {
    return this.ventaForm.get('detalles') as FormArray;
  }

  get pagos(): FormArray {
    return this.ventaForm.get('pagos') as FormArray;
  }

  addDetalle(): void {
    const detalleGroup = this.fb.group({
      productoId: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
      subtotal: [{ value: 0, disabled: true }]
    });

    // Suscribirse para actualizar subtotal cuando cambie cantidad o precioUnitario
    detalleGroup.get('cantidad')!.valueChanges.subscribe(() => this.actualizarSubtotal(detalleGroup));
    detalleGroup.get('precioUnitario')!.valueChanges.subscribe(() => this.actualizarSubtotal(detalleGroup));

    this.detalles.push(detalleGroup);
  }

  removeDetalle(index: number): void {
    this.detalles.removeAt(index);
    this.actualizarTotal();
  }

  actualizarSubtotal(detalleGroup: FormGroup): void {
    const cantidad = detalleGroup.get('cantidad')!.value;
    const precio = detalleGroup.get('precioUnitario')!.value;
    const subtotal = cantidad * precio;
    detalleGroup.get('subtotal')!.setValue(subtotal, { emitEvent: false });
    this.actualizarTotal();
  }

  addPago(): void {
    const pagoGroup = this.fb.group({
      fechaPago: ['', Validators.required],
      monto: [0, [Validators.required, Validators.min(0.01)]],
      metodoPago: ['', Validators.required],
      referencia: ['']
    });

    this.pagos.push(pagoGroup);
  }

  removePago(index: number): void {
    this.pagos.removeAt(index);
  }

  actualizarTotal(): void {
    const total = this.detalles.controls.reduce((sum, detalle) => {
      return sum + (detalle.get('subtotal')!.value || 0);
    }, 0);
    this.ventaForm.get('total')!.setValue(total, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.ventaForm.invalid) {
      this.mensaje = 'Completa todos los campos correctamente.';
      return;
    }

    // Envía los datos (asegúrate que el backend esté listo en esta URL)
    this.http.post('http://localhost:8080/ventas', this.ventaForm.getRawValue()).subscribe({
      next: () => this.mensaje = 'Venta registrada exitosamente.',
      error: err => this.mensaje = 'Error: ' + err.message
    });
  }
}

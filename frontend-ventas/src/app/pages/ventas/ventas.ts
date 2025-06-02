import { VentaService } from '../../services/venta';

export class VentasPage {
  ventas: any[] = [];

  constructor() {
    this.cargarVentas();
  }

  cargarVentas() {
    VentaService.obtenerVentas().then(data => {
      this.ventas = data;
      this.render();
    });
  }

  render() {
    const lista = document.getElementById('lista-ventas');
    lista.innerHTML = '';
    this.ventas.forEach(v => {
      const item = document.createElement('li');
      item.textContent = `${v.nombreCliente} - ${v.total} soles`;
      lista.appendChild(item);
    });
  }
}

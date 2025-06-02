import { API_CONFIG } from '../app.config';

export class VentaService {
  static obtenerVentas(): Promise<any> {
    return fetch(API_CONFIG.ventasUrl)
      .then(res => res.json());
  }

  static registrarVenta(data: any): Promise<any> {
    return fetch(API_CONFIG.ventasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json());
  }
}

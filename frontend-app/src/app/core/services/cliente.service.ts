import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private baseUrl = 'http://localhost:8080/api/clientes'; // Ruta a través del Gateway

  constructor(private http: HttpClient) {}

  registrarCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, cliente);
  }
  loginCliente(correo: string, dni: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, { correo, dni });
  }
}

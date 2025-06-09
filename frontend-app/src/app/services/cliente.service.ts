import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private notificacionesUrl = `${environment.apiGatewayUrl}/notificaciones`;
  private licenciasUrl = `${environment.apiGatewayUrl}/licencias`;

  constructor(private http: HttpClient) {}

  obtenerNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.notificacionesUrl);
  }

  obtenerLicencias(): Observable<any[]> {
    return this.http.get<any[]>(this.licenciasUrl);
  }
}

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs'; // tap nos permite "espiar" la respuesta

// Reutilizamos la interfaz que ya definiste
interface LoginResponse {
  status: string;
  id_rol?: number;
  message?: string;
  // Podrías añadir más datos que tu API devuelva, como el nombre o un token
  nombreUsuario?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login'; // La URL de tu API

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  /**
   * Llama a la API para iniciar sesión.
   * Si el login es exitoso, guarda la información del usuario.
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };

    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      // Usamos el operador 'tap' para ejecutar una acción si la petición es exitosa,
      // sin interrumpir el flujo de datos hacia el componente.
      tap(response => {
        if (response.status === 'success' && response.id_rol) {
          this.guardarSesion(email, response.id_rol);
        }
      })
    );
  }

  /**
   * Guarda los datos del usuario en localStorage.
   */
  private guardarSesion(email: string, roleId: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const rolNombre = this.getRolNombre(roleId);
      localStorage.setItem('usuario', JSON.stringify({
        username: email,
        id_rol: roleId,
        rolNombre: rolNombre
      }));
    }
  }

  /**
   * Cierra la sesión del usuario eliminando los datos de localStorage.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario');
    }
  }

  /**
   * Devuelve el nombre del rol basado en su ID.
   */
  private getRolNombre(roleId: number): string {
    switch (roleId) {
      case 1: return 'Gerente';
      case 2: return 'Ejecutivo';
      case 3: return 'Cliente';
      default: return 'Desconocido';
    }
  }
}
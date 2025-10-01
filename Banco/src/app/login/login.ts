import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// --- CAMBIO: Importamos nuestro AuthService y ya no necesitamos HttpClient aquí ---
import { AuthService } from '../auth';

// La interfaz es buena práctica, la mantenemos
interface LoginResponse {
  status: string;
  id_rol?: number;
  message?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, // Necesario para directivas como *ngIf
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  // --- Propiedades que ya tenías, ahora añadimos errorMessage ---
  username = '';
  password = '';
  rememberMe = false;
  isMenuOpen = false;
  errorMessage = ''; // Para mostrar errores en el HTML en lugar de 'alert'

  // --- CAMBIO: Inyectamos AuthService en lugar de HttpClient ---
  constructor(
    private router: Router,
    private authService: AuthService, // El servicio ahora maneja la API
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Tu lógica para el menú se mantiene intacta
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.onDocumentClick.bind(this));
      document.addEventListener('keydown', this.onEscapeKey.bind(this));
    }
  }

  // --- CAMBIO: El método login ahora es mucho más limpio ---
  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }
    this.errorMessage = '';

    // Llamamos al servicio y nos suscribimos a la respuesta
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        // El servicio ya se encargó de guardar en localStorage si el login fue exitoso
        if (res.status === 'success' && res.id_rol) {
          // Si todo está bien, solo nos preocupamos de redirigir
          this.redirigirPorRol(res.id_rol);
        } else {
          // Si el backend devuelve un error de negocio (ej. contraseña incorrecta)
          this.errorMessage = res.message || 'Credenciales inválidas.';
        }
      },
      error: (err) => {
        // Si hay un error de conexión con la API
        console.error('Error de conexión con la API:', err);
        this.errorMessage = 'Error de conexión. Intenta nuevamente más tarde.';
      }
    });
  }

  // --- CAMBIO: Este método ahora solo se encarga de la redirección ---
  private redirigirPorRol(roleId: number): void {
    let route = '';
    // Tu lógica de switch está perfecta, la mantenemos
    switch (roleId) {
      case 1: route = '/inicio-ejecutivo'; break;
      case 2: route = '/inicio-gerente'; break;
      case 3: route = '/inicio-cliente'; break;
      default:
        this.errorMessage = 'Rol de usuario no reconocido.';
        return;
    }
    this.router.navigate([route]);
  }

  // --- Tus métodos para el menú se mantienen intactos ---
  toggleMenu(): void { this.isMenuOpen = !this.isMenuOpen; }

  showAlert(item: string): void { 
    alert(`Seleccionaste: ${item}`); 
    this.isMenuOpen = false; 
  }

  onDocumentClick(event: Event): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const menuTrigger = document.getElementById('menuTrigger');
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (menuTrigger && dropdownMenu &&
        !menuTrigger.contains(event.target as Node) &&
        !dropdownMenu.contains(event.target as Node)) {
      this.isMenuOpen = false;
    }
  }

  onEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.isMenuOpen = false;
  }
}
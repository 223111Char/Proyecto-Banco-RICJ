import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // RouterModule necesario para routerLink
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // FormsModule necesario para ngModel
import { ViewEncapsulation } from '@angular/core';
// Definimos una interfaz para tipar la respuesta del backend
interface LoginResponse {
  status: string;       // "success" o "error"
  id_rol?: number;      // Rol del usuario (1, 2, 3), opcional
  message?: string;     // Mensaje de error o información del backend
}

@Component({
  selector: 'app-login',           // Nombre del componente para usarlo en templates
  standalone: true,                // Componente independiente (no necesita NgModule)
  imports: [
    FormsModule,       // Permite usar ngModel
    RouterModule,      // Permite usar routerLink
    HttpClientModule   // Permite usar HttpClient
  ],
  templateUrl: './login.html', // HTML asociado
  styleUrls: ['./login.css'], // Estilos asociados
  encapsulation: ViewEncapsulation.None // Permite que los estilos afecten a elementos hijos (como el menú desplegable)
})
export class LoginComponent implements OnInit {
  // Propiedades ligadas al formulario de login
  username = '';       // Campo de usuario/correo
  password = '';       // Campo de contraseña
  rememberMe = false;  // Checkbox "Recordarme"
  
  // Estado del menú desplegable (si está abierto o cerrado)
  isMenuOpen = false;

  // URL del endpoint de login
  private loginUrl = 'http://localhost:3000/login';

  // Inyectamos dependencias: Router para navegación, HttpClient para peticiones, PLATFORM_ID para detectar el entorno
  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Comprobamos que estamos en navegador (no en servidor)
    if (isPlatformBrowser(this.platformId)) {
      // Escuchamos clicks globales para cerrar el menú si se hace click fuera
      document.addEventListener('click', this.onDocumentClick.bind(this));
      // Escuchamos la tecla Escape para cerrar el menú
      document.addEventListener('keydown', this.onEscapeKey.bind(this));
    }
  }

  // Método que se ejecuta al enviar el formulario
  login(): void {
    // Validación básica: campos vacíos
    if (!this.username || !this.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Creamos el objeto con los datos que enviaremos al backend
    const datos = { email: this.username, password: this.password };

    // Hacemos la petición POST al servidor
    this.http.post<LoginResponse>(this.loginUrl, datos).subscribe(
      res => {
        // Si el login es exitoso
        if (res.status === 'success') {
          this.handleLoginSuccess(res.id_rol!); // Llamamos al método que maneja el éxito
        } else {
          // Si hubo error, mostramos mensaje del backend
          alert(res.message);
        }
      },
      err => {
        // Si la petición falla (error de red o servidor)
        console.error(err);
        alert('Error en el login. Intenta nuevamente.');
      }
    );
  }

  // Método privado para manejar el login exitoso
  private handleLoginSuccess(roleId: number) {
    let rolNombre = ''; // Nombre del rol
    let route = '';     // Ruta a la que se redirige según rol

    // Definimos redirección y nombre según el id_rol
    switch (roleId) {
      case 1: rolNombre = 'Gerente'; route = '/ini-ger'; break;
      case 2: rolNombre = 'Ejecutivo'; route = '/ini-eje'; break;
      case 3: rolNombre = 'Cliente'; route = '/ini-clie'; break;
      default: 
        alert('Rol de usuario no reconocido. No se puede redirigir.');
        return; // Salimos si rol desconocido
    }

    // Guardamos información del usuario en localStorage si estamos en navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuario', JSON.stringify({
        username: this.username,
        id_rol: roleId,
        rolNombre
      }));
    }

    // Mostramos mensaje de éxito
    alert('Login exitoso');
    // Redirigimos al usuario según su rol
    this.router.navigate([route]);
  }

  // ------------------- Métodos para el menú desplegable -------------------

  // Alterna abrir/cerrar menú
  toggleMenu(): void { this.isMenuOpen = !this.isMenuOpen; }

  // Muestra alerta con el elemento seleccionado y cierra el menú
  showAlert(item: string): void { 
    alert(`Seleccionaste: ${item}`); 
    this.isMenuOpen = false; 
  }

  // Cierra menú si se hace click fuera de él
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

  // Cierra menú si se presiona la tecla Escape
  onEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.isMenuOpen = false;
  }
}

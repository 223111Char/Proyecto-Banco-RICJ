import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-ejecutivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-ejecutivo.html',
  styleUrls: ['./inicio-ejecutivo.css']
})
export class InicioEjecutivo {

  openAccount(): void {
    console.log('Apertura de cuenta');
    alert('Iniciando apertura de cuenta...');
  }

  registerClient(): void {
    console.log('Registro de cliente');
    alert('Abriendo registro de cliente...');
  }

  consultHistory(): void {
    console.log('Consultar historial');
    alert('Consultando historial...');
  }

  updateClientData(): void {
    console.log('Actualizar datos');
    alert('Actualizando datos del cliente...');
  }

  appointments(): void {
    console.log('Agendar cita');
    alert('Abriendo calendario...');
  }

  searchClients(searchTerm: any): void {
    const term = searchTerm;
    console.log('Buscando cliente:', term);
    // Aquí irá la lógica de búsqueda cuando tengas el backend
  }

  abrirPerfil(cliente: any): void {
    console.log('Abriendo perfil de cliente');
    alert('Abriendo perfil de cliente');
  }

  logout(): void {
    console.log('Cerrar sesión');
    alert('Cerrando sesión...');
  }
}
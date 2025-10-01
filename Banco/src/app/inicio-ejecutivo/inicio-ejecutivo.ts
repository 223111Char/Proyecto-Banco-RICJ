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

  // Propiedad para almacenar y mostrar la lista de clientes.
  public clientesFiltrados: any[] = [
    { nombre: 'Juan Pérez', info: 'Cuenta de Ahorro', estado: 'Nuevo' },
    { nombre: 'Ana García', info: 'Tarjeta de Crédito', estado: 'Activo' },
    { nombre: 'Luis Hernández', info: 'Préstamo Personal', estado: 'Activo' }
  ];

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

  // ===================================================================
  // ==                INICIA EL CÓDIGO AÑADIDO                       ==
  // ===================================================================
  // Este es el nuevo método que soluciona el error.
  // Recibe el evento del input, extrae el texto y llama a searchClients.
  onSearchInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.searchClients(searchTerm);
  }
  // ===================================================================
  // ==                 TERMINA EL CÓDIGO AÑADIDO                     ==
  // ===================================================================

  searchClients(searchTerm: string): void {
    console.log('Buscando cliente:', searchTerm);
    // Aquí irá la lógica de búsqueda cuando tengas el backend
  }

  abrirPerfil(cliente: any): void {
    console.log('Abriendo perfil de cliente', cliente);
    alert(`Abriendo perfil de ${cliente.nombre}`);
  }

  logout(): void {
    console.log('Cerrar sesión');
    alert('Cerrando sesión...');
  }
}
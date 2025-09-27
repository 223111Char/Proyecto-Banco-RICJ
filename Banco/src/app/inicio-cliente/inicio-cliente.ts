import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-cliente.html',
  styleUrls: ['./inicio-cliente.css']
})
export class InicioCliente {

  transfer(): void {
    console.log('Transferir dinero');
    alert('Función de transferencia');
  }

  payBills(): void {
    console.log('Pagar tarjeta');
    alert('Función de pago de tarjeta');
  }

  deposit(): void {
    console.log('Depositar');
    alert('Función de depósito');
  }

  withdraw(): void {
    console.log('Retirar');
    alert('Función de retiro');
  }

  payServices(): void {
    console.log('Pagar servicios');
    alert('Función de pago de servicios');
  }

  requestLoan(): void {
    console.log('Solicitar préstamo');
    alert('Función de préstamo');
  }

  openAccount(): void {
    console.log('Nueva cuenta');
    alert('Función de nueva cuenta');
  }

  requestCard(): void {
    console.log('Solicitar tarjeta');
    alert('Función de solicitar tarjeta');
  }

  investments(): void {
    console.log('Inversiones');
    alert('Función de inversiones');
  }

  viewDetails(accountType: string): void {
    console.log('Ver detalles de:', accountType);
    alert(`Ver detalles de ${accountType}`);
  }

  filterTransactions(filterType: any): void {
    const value = filterType;
    console.log('Filtrar por:', value);
    // Lógica de filtrado aquí
  }

  logout(): void {
    console.log('Cerrar sesión');
    alert('Cerrando sesión...');
  }
}
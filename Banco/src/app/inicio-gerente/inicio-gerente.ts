import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PendingApproval {
  title: string;
  client: string;
  amount: string;
  date: string;
  type: string;
}

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  performance: string;
  id: string;
}

@Component({
  selector: 'app-inicio-gerente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-gerente.html',
  styleUrls: ['./inicio-gerente.css']
})
export class InicioGerente {

  pendingApprovals: PendingApproval[] = [
    {
      title: 'Crédito Hipotecario',
      client: 'José Martínez',
      amount: '$850,000 MXN',
      date: 'Solicitado hace 2 horas',
      type: 'hipotecario'
    },
    {
      title: 'Queja Escalada',
      client: 'María Rodriguez',
      amount: 'Servicio deficiente',
      date: 'Escalada por supervisor',
      type: 'queja'
    },
    {
      title: 'Crédito Empresarial',
      client: 'Constructora ABC',
      amount: '$2,500,000 MXN',
      date: 'Solicitado ayer',
      type: 'empresarial'
    },
    {
      title: 'Límite de Crédito',
      client: 'Ana López',
      amount: 'Aumento a $150,000 MXN',
      date: 'Solicitado hace 3 días',
      type: 'limite'
    }
  ];

  team: TeamMember[] = [
    {
      initials: 'IG',
      name: 'Iris González',
      role: 'Ejecutivo de Cuenta',
      performance: 'Excelente',
      id: 'iris'
    }
  ];

  manageTeam(): void {
    console.log('Dirigir empleados');
    alert('Función de gestión de equipo');
  }

  handleComplaints(): void {
    console.log('Resolver quejas');
    alert('Función de manejo de quejas');
  }

  approveCredits(): void {
    console.log('Aprobar créditos');
    alert('Función de aprobación de créditos');
  }

  reviewReports(): void {
    console.log('Revisar reportes');
    alert('Función de revisión de reportes');
  }

  approveItem(item: PendingApproval): void {
    console.log('Aprobar:', item);
    alert(`Aprobando: ${item.title} para ${item.client}`);
  }

  rejectItem(item: PendingApproval): void {
    console.log('Rechazar:', item);
    alert(`Rechazando: ${item.title} para ${item.client}`);
  }

  viewEmployeeDetails(member: TeamMember): void {
    console.log('Ver detalles del empleado:', member);
    alert(`Viendo detalles de ${member.name}`);
  }

  assignTask(member: TeamMember, event: Event): void {
    event.stopPropagation();
    console.log('Asignar tarea a:', member);
    alert(`Asignando tarea a ${member.name}`);
  }

  logout(): void {
    console.log('Cerrar sesión');
    alert('Cerrando sesión...');
  }
}
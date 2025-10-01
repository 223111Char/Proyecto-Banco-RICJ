import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// 1. IMPORTAMOS FormsModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true, // Asegúrate de que tus componentes sean standalone
  imports: [
    CommonModule,
    FormsModule // Y que FormsModule esté en los imports
  ],
  templateUrl: './crear-cuenta.html',
  styleUrls: ['./crear-cuenta.css']
})
export class CrearCuentaComponent {

  // 2. CREAMOS UN OBJETO PARA ALMACENAR LOS DATOS DEL FORMULARIO
  public cuentaModel = {
    nombreCompleto: '',
    telefono: '',
    email: '',
    fechaNacimiento: ''
  };

  constructor(private router: Router) { }

  onSubmit(): void {
    alert('Formulario enviado correctamente');
    
    // 3. MOSTRAMOS LOS DATOS RECOLECTADOS EN LA CONSOLA
    console.log('Datos de la nueva cuenta:', this.cuentaModel);
    
    // La redirección sigue funcionando igual
    this.router.navigate(['/solicitud-tarjeta']);
  }

  onUploadClick(event: MouseEvent): void {
    const btn = event.target as HTMLButtonElement;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,.pdf';
    input.onchange = () => {
      if (input.files && input.files.length > 0) {
        btn.textContent = 'Cargado';
        btn.style.background = '#4CAF50';
        btn.style.color = 'white';
      }
    };
    input.click();
  }
}
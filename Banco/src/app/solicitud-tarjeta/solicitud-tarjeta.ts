// 1. IMPORTA ChangeDetectorRef de @angular/core
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TerminosYCondicionesComponent } from '../terminos-y-condiciones/terminos-y-condiciones';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-tarjeta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './solicitud-tarjeta.html',
  styleUrls: ['./solicitud-tarjeta.css']
})
export class SolicitudTarjetaComponent {

  public aceptaTerminos: boolean = false;

  // 2. INYECTA ChangeDetectorRef (lo llamaremos 'cdr') en el constructor
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    console.log('¿El router llegó al constructor?', this.router);
  }

  abrirTerminos(): void {
    const dialogRef = this.dialog.open(TerminosYCondicionesComponent, {
      width: '90%',
      maxWidth: '900px',
      height: '90%',
      panelClass: 'terminos-dialog-container',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(resultado => {
      console.log('El diálogo se cerró con el resultado:', resultado);
      
      if (resultado === true) {
        // Si el usuario aceptó, marcamos la casilla
        this.aceptaTerminos = true;

        // =================================================================
        // 3. FORZAMOS la detección de cambios para actualizar la vista
        // =================================================================
        this.cdr.detectChanges();

      } else if (resultado === false) {
        // Si el usuario declinó, lo redirigimos al login
        console.log('Términos declinados, redirigiendo a login...');
        this.router.navigate(['/login']);
      }
    });
  }

  onContinuar(): void {
    if (this.aceptaTerminos) {
      console.log('Botón Continuar presionado, redirigiendo a login...');
      this.router.navigate(['/login']);
    } else {
      alert('Por favor, acepte los términos y condiciones para continuar.');
    }
  }

  onCancelar(): void {
    console.log('Botón Cancelar presionado, redirigiendo a login...');
    this.router.navigate(['/login']);
  }
}
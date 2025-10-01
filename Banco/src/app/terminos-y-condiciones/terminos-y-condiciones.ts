import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // CommonModule para directivas como ngClass, ngIf

@Component({
  selector: 'app-terminos-y-condiciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminos-y-condiciones.html',
  styleUrls: ['./terminos-y-condiciones.css']
})
export class TerminosYCondicionesComponent implements AfterViewInit {
  // Con @ViewChild, obtenemos una referencia al div con #terms del HTML
  @ViewChild('terms') private termsScroll!: ElementRef;

  // Propiedades para controlar el estado del botón
  public textoBotonAceptar: string = 'Declinar';
  public puedeAceptar: boolean = false;

  constructor(public dialogRef: MatDialogRef<TerminosYCondicionesComponent>) {}

  // Este método se ejecuta después de que la vista se ha inicializado
  ngAfterViewInit() {
    // Hacemos una comprobación inicial por si el contenido es tan corto que no hay scroll
    setTimeout(() => this.checkScroll(), 0);
  }

  // Se ejecuta cada vez que el usuario hace scroll en el div
  onContentScroll(): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    const element = this.termsScroll.nativeElement;
    const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 5;

    if (atBottom) {
      this.textoBotonAceptar = 'Aceptar';
      this.puedeAceptar = true;
    } else {
      this.textoBotonAceptar = 'Declinar';
      this.puedeAceptar = false;
    }
  }

  onAceptarDeclinar(): void {
    if (this.puedeAceptar) {
      alert('Has aceptado los términos. ✅');
      // Cerramos el modal y devolvemos 'true' para indicar que se aceptó
      this.dialogRef.close(true);
    } else {
      alert('Has declinado los términos. ❌');
      // Cerramos el modal y devolvemos 'false'
      this.dialogRef.close(false);
    }
  }

  imprimir(): void {
    window.print();
  }

  regresar(): void {
    // Simplemente cerramos el modal
    this.dialogRef.close();
  }
}
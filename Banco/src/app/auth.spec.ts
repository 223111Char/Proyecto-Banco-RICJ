import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Necesario para pruebas con HttpClient

// --- LA CORRECCIÓN ESTÁ AQUÍ ---
// Importamos el nombre correcto de la clase: AuthService
import { AuthService } from './auth';

describe('AuthService', () => { // Cambiamos el nombre de la prueba también
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // Añadimos el módulo para simular HttpClient
    });
    // Y usamos el nombre correcto aquí también
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login'; 
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta';
import { SolicitudTarjetaComponent } from './solicitud-tarjeta/solicitud-tarjeta'; // Importar el componente SolicitudTarjetaComponent
import { InicioCliente } from './inicio-cliente/inicio-cliente';
import { InicioEjecutivo } from './inicio-ejecutivo/inicio-ejecutivo';
import { InicioGerente } from './inicio-gerente/inicio-gerente';
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'crear-cuenta', component: CrearCuentaComponent},  // Ruta para el componente CrearCuentaComponent
    {path: 'solicitud-tarjeta', component: SolicitudTarjetaComponent}, // Ruta para el componente SolicitudTarjetaComponent
    {path: 'inicio-cliente', component: InicioCliente}, // Ruta para el componente InicioCliente
    {path: 'inicio-ejecutivo', component: InicioEjecutivo}, // Ruta para el componente InicioEjecutivo
    {path: 'inicio-gerente', component: InicioGerente}, // Ruta para el componente InicioGerente

    // --- Rutas de Redirección ---
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

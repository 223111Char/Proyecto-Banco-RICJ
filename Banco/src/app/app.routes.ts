import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Registrar } from './registrar/registrar';  

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registrar', component: Registrar},  // Ruta para el componente Registrar

    // --- Rutas de Redirección ---
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];

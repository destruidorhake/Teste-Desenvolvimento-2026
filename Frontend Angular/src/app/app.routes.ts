import { Routes } from '@angular/router';

import { authGuard } from './guards/auth-guard';
import { Home } from './components/home/home';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home, canActivate: [authGuard] }
];

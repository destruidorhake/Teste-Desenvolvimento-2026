import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';

  errorMessage = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {}

  // LOGAR USUÁRIO
  login(): void {
    this.authService.login(
      this.username,
      this.password

    ).subscribe({

      next: () => {
        sessionStorage.setItem('logged', 'true');
        Swal.fire({
          icon: 'success',
          title: 'Login realizado',
          text: 'Bem-vindo ao sistema!',
          timer: 1800,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1800);
      },

      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erro no login',
          text: 'Usuário ou senha inválidos'
        });
      }
    });
  }
}

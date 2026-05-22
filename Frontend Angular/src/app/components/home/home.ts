import { DocumentPipe } from '../../pipes/document.pipe';
import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { CommonModule } from '@angular/common';
import { PersonService } from '../../services/person/person';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm  } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, DocumentPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  persons: Person[] = [];

  person: Person = {
    documentType: 'CPF',
    document: '',
    name: '',
    lastname: '',
    email: ''
  };

  constructor(
    private personService: PersonService,
    private cdr: ChangeDetectorRef,
    private authService: Auth,
    private router: Router
  ) {}

  // INICIALIZA A LISTA DE PESSOAS
  ngOnInit(): void {
    this.loadPersons();
  }

  // CARREGA A LISTA DE PESSOAS
  loadPersons(): void {
    this.personService.list().subscribe({

      next: (response) => {
        this.persons = response;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      }

    });
  }

  // SALVAR FORMULARIO PESSOA
  save(form: NgForm): void {
    const personToSave = {...this.person,
      document: this.person.document.replace(/\D/g, '')
    };

    this.personService.create(personToSave).subscribe({
      next: () => {
        Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Pessoa salva com sucesso!',
        timer: 2000,
        showConfirmButton: false
      });

      this.loadPersons();

      form.resetForm({
        documentType: 'CPF'
      });
    },

    // Erros de validação
    error: (error) => {
      console.error(error);
      let message = 'Erro ao salvar pessoa';

      try {
        const parsed =
          typeof error.error === 'string'
            ? JSON.parse(error.error)
            : error.error;

        if (parsed.message) {
          message = parsed.message;
        } else {
          message = Object.values(parsed).join('\n');
        }

      } catch {
        message = error.error || message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: message
      });
    }

    });
  }

  // EXCLUIR PESSOA
  delete(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa pessoa será removida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.personService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Removido',
              text: 'Pessoa removida com sucesso!',
              timer: 2000,
              showConfirmButton: false
            });

            this.loadPersons();
          },

          error: (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Erro ao remover pessoa'
            });
          }
        });
      }
    });
  }

  // MOSTRA NACIONALIDADE
  showNationality(id: number): void {
    this.personService.findNationality(id).subscribe({

      next: (response) => {
        Swal.fire({
          icon: 'info',
          title: 'Nacionalidade',
          text: 'Possível nacionalidade: ' + response
        });
      },

      error: (error) => {
        console.error(error);
      }

    });
  }

  // OBTEM PLACEHOLDER PARA DOCUMENTO
  getDocumentPlaceholder(): string {
    switch (this.person.documentType) {
      case 'CPF':
        return '000.000.000-00';
      case 'RG':
        return '00.000.000-0';
      case 'CNPJ':
        return '00.000.000/0001-00';
      default:
        return 'Digite o documento';
    }
  }

  // LIMPAR CAMPO DOCUMENTO
  clearDocument(): void {
    this.person.document = '';
    setTimeout(() => {
      this.formatDocument();
    });
  }

  // FORMATA O CAMPO DOCUMENTO DE ACORDO COM O TIPO SELECIONADO
  formatDocument(): void {
    let value = this.person.document.replace(/\D/g, '');
    switch (this.person.documentType) {

      // CPF
      case 'CPF':
        value = value
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        break;

      // RG
      case 'RG':
        value = value
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1})$/, '$1-$2');
        break;

      // CNPJ
      case 'CNPJ':
        value = value
          .replace(/^(\d{2})(\d)/, '$1.$2')
          .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
          .replace(/\.(\d{3})(\d)/, '.$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2');
        break;
    }

    this.person.document = value;
  }

  // OBTEM O MAXLENGTH PARA O CAMPO DOCUMENTO DE ACORDO COM O TIPO SELECIONADO
  getDocumentMaxLength(): number {
    switch (this.person.documentType) {

      case 'CPF':
        return 14;

      case 'RG':
        return 12;

      case 'CNPJ':
        return 18;

      default:
        return 20;
    }
  }

  // LOGOUT COM CONFIRMAÇÃO
  logout(): void {
    Swal.fire({
      title: 'Deseja sair?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sair',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.authService.logout();
        Swal.fire({
          icon: 'success',
          title: 'Logout realizado',
          timer: 1500,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      }
    });
  }
}

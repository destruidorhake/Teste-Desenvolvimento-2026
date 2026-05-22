import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDocument',
  standalone: true
})
export class DocumentPipe implements PipeTransform {
  transform(value: any, type: any): string {
    if (!value || !type) return '';
    // Remove tudo que não é dígito
    let doc = value.replace(/\D/g, '');

    switch (type) {
      case 'CPF':
        return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      case 'RG':
        return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
      case 'CNPJ':
        return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      default:
        return value;
    }
  }
}

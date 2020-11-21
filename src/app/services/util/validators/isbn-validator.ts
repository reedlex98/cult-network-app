import { FormControl } from '@angular/forms';

export class IsbnValidator {
  static validIsbn(control: FormControl): { [key: string]: any } {
    let { value } = control;

    value = value.replace(/-/g, '');

    // Verifica se valor contém caracteres diferentes de numeros
    if (/^[^0-9]+/.test(value)) {
      return { isInvalidIsbn: true };
    }

    // Verifica se atende o padrão de 10 ou o de 13 caracteres
    if (value.length > 0 && value.length !== 10 && value.length !== 13) {
      return { isInvalidIsbn: true };
    }

    // Verifica se é um IBSN-10 válido
    if (value.length === 10) {
      const sum = value
      .split('')
        .map((num, i, arr) => +num * (arr.length - i))
        .reduce((acc, curr) => acc + curr, 0);
      return sum % 11 !== 0 ? ({ isInvalidIsbn: true }) : null;
    }

    // Verifica se é um IBSN-13 válido
    if (value.length === 13) {
      const sum = value
        .split('')
        .map((num, i) => ((i + 1) % 2 === 0 ? num * 3 : num * 1))
        .reduce((acc, curr) => acc + curr, 0);
      return sum % 10 !== 0 ? ({ isInvalidIsbn:  true}) : null;
    }

    return null;
  }
}

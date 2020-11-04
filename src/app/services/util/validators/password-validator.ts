import { FormControl } from '@angular/forms';

export class PasswordValidator {

  static hasEmptySpace(control: FormControl): { [key: string]: any } {
    if (control.value.split(" ").length !== [control.value].length)
      return { "hasEmptySpace": true };
    return null;
  }

  static minChar(control: FormControl): { [key: string]: any } {
    let pMinPattern = /.{8,}/
    if (!control.value.match(pMinPattern))
      return { "minChar": true };
    return null;
  }

  static minUpperChar(control: FormControl): { [key: string]: any } {
    let pMinPattern = /[A-Z]{1,}/
    if (!control.value.match(pMinPattern))
      return { "minUpperChar": true };
    return null;
  }

  static minLowerChar(control: FormControl): { [key: string]: any } {
    let pMinPattern = /[a-z]{1,}/
    if (!control.value.match(pMinPattern))
      return { "minLowerChar": true };
    return null;
  }

  static minNumberChar(control: FormControl): { [key: string]: any } {
    let pMinPattern = /[0-9]{1,}/
    if (!control.value.match(pMinPattern))
      return { "minNumberChar": true };
    return null;
  }

  static minSpecialChar(control: FormControl): { [key: string]: any } {
    let pMinPattern = /[@$!%*?&#]{1,}/
    if (!control.value.match(pMinPattern))
      return { "minSpecialChar": true };
    return null;
  }
}

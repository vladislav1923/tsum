import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Pipe({name: 'formControlErrorMessagePipe', pure: false})
export class FormControlErrorMessagePipe implements PipeTransform {
  transform(formControl: AbstractControl): string {
    if (!formControl.touched) {
      return;
    }

    if (formControl.getError('required')) {
      return 'Поле обязательно для заполнения';
    }

    if (formControl.getError('isNotOnlyCyrillic')) {
      return 'Поле может содержать только киррилицу';
    }

    if (formControl.getError('isLessTwoWords')) {
      return 'Поле должно содержать минимум два слова';
    }

    if (formControl.getError('isInvalidEmail')) {
      return 'Некорректная электронная почта';
    }
  }
}

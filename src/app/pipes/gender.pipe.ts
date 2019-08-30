import {Pipe, PipeTransform} from '@angular/core';
import {GendersEnum} from '../enums/genders.enum';

@Pipe({name: 'genderPipe', pure: false})
export class GenderPipe implements PipeTransform {
  transform(value: GendersEnum): string {
    switch (value) {
      case GendersEnum.man:
        return 'Мужской';
      case GendersEnum.woman:
        return 'Женский';
      default:
        return 'Не выбран';
    }
  }
}

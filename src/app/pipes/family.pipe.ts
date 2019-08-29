import {Pipe, PipeTransform} from '@angular/core';
import {FamiliesEnum} from '../enums/families.enum';

@Pipe({name: 'familyPipe', pure: false})
export class FamilyPipe implements PipeTransform {
  transform(value: FamiliesEnum): string {
    switch (value) {
      case FamiliesEnum.none:
        return 'Нет';
      case FamiliesEnum.marriedForMan:
        return 'Женат';
      case FamiliesEnum.marriedForWoman:
        return 'Замужем';
      case FamiliesEnum.divorced:
        return 'Разведен';
      default:
        return 'Не выбран';
    }
  }
}

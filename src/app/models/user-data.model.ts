import {GendersEnum} from '../enums/genders.enum';
import {FamiliesEnum} from '../enums/families.enum';

export class UserDataModel {

  public name: string | null = null;
  public gender: GendersEnum | null = null;
  public birthday: string | null = null;
  public family: FamiliesEnum | null = null;
  public children: number | null = null;
  public email: string | null = null;
  public comment: string | null = null;

}

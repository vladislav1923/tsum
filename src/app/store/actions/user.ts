import {Action} from '@ngrx/store';
import {UserDataModel} from '../../models/user-data.model';

export const UPDATE_USER_DATA = '[UserData] Update userData';

export class UpdateUserData implements Action {
  readonly type = UPDATE_USER_DATA;

  constructor(public payload: UserDataModel) {}
}

export type Action = UpdateUserData;

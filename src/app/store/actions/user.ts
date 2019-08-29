import {Action} from '@ngrx/store';
import {UserDataModel} from '../../models/user-data.model';

export const UPDATE_USER_DATA = '[UserData] Update userData';
export const SET_DATA_STATUS = '[UserData] set data status';

export class UpdateUserData implements Action {
  readonly type = UPDATE_USER_DATA;

  constructor(public payload: UserDataModel) {}
}
export class SetDataStatus implements Action {
  readonly type = SET_DATA_STATUS;

  constructor(public payload: boolean) {}
}


export type Action = UpdateUserData | SetDataStatus;

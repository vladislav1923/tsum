import * as formAction from '../actions/user';
import {UserDataModel} from '../../models/user-data.model';

export interface State {
  userData: UserDataModel;
}

export const initialState: State = {
  userData: new UserDataModel()
};

export function reducer(state = initialState, action: formAction.Action): State {
  switch (action.type) {
    case formAction.UPDATE_USER_DATA: {
      return {
        userData: action.payload
      };
    }
    default:
      return state;
  }
}

export const getUserData = (state: State) => state.userData;

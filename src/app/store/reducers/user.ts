import * as formAction from '../actions/user';
import {UserDataModel} from '../../models/user-data.model';

export interface State {
  userData: UserDataModel;
  isValid: boolean;
}

export const initialState: State = {
  userData: new UserDataModel(),
  isValid: false
};

export function reducer(state = initialState, action: formAction.Action): State {
  switch (action.type) {
    case formAction.UPDATE_USER_DATA: {
      return {
        userData: action.payload,
        isValid: state.isValid
      };
    }
    case formAction.SET_DATA_STATUS: {
      return {
        userData: state.userData,
        isValid: action.payload
      };
    }
    default:
      return state;
  }
}

export const getUserData = (state: State) => state.userData;
export const getDataStatus = (state: State) => state.isValid;

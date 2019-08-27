import * as formAction from '../actions/form';
import {FormModel} from '../../models/form.model';

export interface State {
  form: FormModel;
}

export const initialState: State = {
  form: new FormModel()
};

export function reducer(state = initialState, action: formAction.Action) {
  switch (action.type) {
    case formAction.UPDATE_FORM: {
      return {
        form: action.payload
      };
    }
    default:
      return state;
  }
}

export const getForm = (state: State) => state.form;

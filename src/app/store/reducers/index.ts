import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as formStore from './form';

export interface State {
  form: formStore.State;
}

export const reducers: ActionReducerMap<State> = {
  form: formStore.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    console.log('store state', state);
    console.log('store action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];

export const getFormState = createFeatureSelector<formStore.State>('form');

export const getForm = createSelector(
  getFormState,
  formStore.getForm
);

import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import * as userStore from './user';

export interface State {
  userData: userStore.State;
}

export const reducers: ActionReducerMap<State> = {
  userData: userStore.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];

export const getFormState = createFeatureSelector<userStore.State>('userData');

export const getUserData = createSelector(
  getFormState,
  userStore.getUserData
);

export const getDataStatus = createSelector(
  getFormState,
  userStore.getDataStatus
);

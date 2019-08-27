import {Action} from '@ngrx/store';
import {FormModel} from '../../models/form.model';

export const UPDATE_FORM = '[Form] Update form';

export class UpdateForm implements Action {
  readonly type = UPDATE_FORM;

  constructor(public payload: FormModel) {}
}

export type Action = UpdateForm;

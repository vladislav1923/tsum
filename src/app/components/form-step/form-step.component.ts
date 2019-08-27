import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as formAction from '../../store/actions/form';
import {FormModel} from '../../models/form.model';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.less']
})
export class FormStepComponent implements OnInit {

  private readonly formStore: Store<fromRoot.State>;

  constructor(formStore: Store<fromRoot.State>) {
    this.formStore = formStore;
  }

  public async ngOnInit(): Promise<void> {
    this.formStore.select(fromRoot.getForm).subscribe((s) => {
      console.log('up', s);
    });

    let form;
    console.log('in comp', form);

    form = new FormModel();
    form.whatever = 1;

    this.formStore.dispatch(new formAction.UpdateForm(form));
  }

}

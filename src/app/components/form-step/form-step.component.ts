import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as formAction from '../../store/actions/user';
import {UserDataModel} from '../../models/user-data.model';
import {Subscription} from 'rxjs';
import {SelectItemModel} from '../../models/select-item.model';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.less']
})
export class FormStepComponent implements OnInit, OnDestroy {

  public userForm: FormGroup;
  public isMoreEighteenAge = false;
  public genderItems: SelectItemModel[] = [
    new SelectItemModel('man', 'Мужской'),
    new SelectItemModel('woman', 'Женский')
  ];
  public familyStatuses: SelectItemModel[] = [];

  private $changeGender: Subscription;
  private $changeBirthday: Subscription;
  private readonly formBuilder: FormBuilder;
  private readonly userStore: Store<fromRoot.State>;

  constructor(formBuilder: FormBuilder, userStore: Store<fromRoot.State>) {
    this.formBuilder = formBuilder;
    this.userStore = userStore;
  }

  public async ngOnInit(): Promise<void> {
    this.userStore.select(fromRoot.getUserData).subscribe((s) => {
      console.log('up', s);
    });

    let form;
    console.log('in comp', form);

    form = new UserDataModel();
    form.whatever = 1;

    this.userStore.dispatch(new formAction.UpdateUserData(form));

    this.initForm();
    this.setFamilyStatuses();
    this.$changeGender = this.userForm.get('gender').valueChanges.subscribe(this.setFamilyStatuses);
    this.$changeBirthday = this.userForm.get('birthday').valueChanges.subscribe(this.onChangeBirthday);
  }

  public ngOnDestroy(): void {
    this.$changeGender.unsubscribe();
    this.$changeBirthday.unsubscribe();
  }

  public onSubmit(): void {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls)
        .forEach(controlName => this.userForm.controls[controlName].markAsTouched());

      return;
    }

    // submit to server
  }

  private setFamilyStatuses = (): void => {
    this.familyStatuses = [];
    this.familyStatuses.push(new SelectItemModel(null, 'Не выбрано'));

    switch (this.userForm.get('gender').value) {
      case 'man':
        this.familyStatuses.push(new SelectItemModel('marriedForMan', 'Женат'));
        break;
      case 'woman':
        this.familyStatuses.push(new SelectItemModel('marriedForWoman', 'Замужем'));
        break;
      default:
        this.familyStatuses.push(new SelectItemModel('marriedForMan', 'Женат'));
        this.familyStatuses.push(new SelectItemModel('marriedForWoman', 'Замужем'));
        break;
    }

    this.familyStatuses.push(new SelectItemModel('divorced', 'В разводе'));
    this.familyStatuses.push(new SelectItemModel('none', 'Нет'));
  }


  private initForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, this.nameValidator]],
      gender: [null, Validators.required],
      birthday: [null, Validators.required],
      family: [null, Validators.required],
      children: [null],
      email: ['', [Validators.required, this.emailValidator]],
      comment: ['', this.commentValidator]
    });
  }

  private nameValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const valueAsArray = value.split(' ');
    const hasOnlyCyrillic = /^[А-Яа-я\s]*$/.test(value);
    const hasTwoAndMoreWords = valueAsArray.length > 1 && valueAsArray[0] && valueAsArray[1];

    if (!hasOnlyCyrillic) {
      return { isNotOnlyCyrillic: true };
    }

    if (!hasTwoAndMoreWords) {
      return { isLessTwoWords: true };
    }

    return null;
  }

  private emailValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const isValidEmail = /\S+@\S+\.\S+/.test(value);

    if (!isValidEmail) {
      return { isInvalidEmail: true };
    }

    return null;
  }

  private commentValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const hasOnlyCyrillic = /^[?\-_!.:+=0-9А-Яа-я\s]*$/.test(value);

    if (!hasOnlyCyrillic) {
      return { isNotOnlyCyrillic: true };
    }

    return null;
  }

  private onChangeBirthday = (value: string): void => {
    const birthday = Number(Date.now()) - Number(value);
    const eighteenAgeDay = 18 * 365 * 24 * 60 * 60 * 1000;
    this.isMoreEighteenAge = birthday >= eighteenAgeDay;

    if (this.isMoreEighteenAge) {
      this.userForm.get('family').setValidators(Validators.required);
    } else {
      this.userForm.get('family').clearValidators();
    }

    // this.userForm.get('family').updateValueAndValidity();
  }

}

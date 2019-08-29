import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../store/reducers';
import * as formAction from '../../store/actions/user';
import {UserDataModel} from '../../models/user-data.model';
import {SelectItemModel} from '../../models/select-item.model';
import {GendersEnum} from '../../enums/genders.enum';
import {FamiliesEnum} from '../../enums/families.enum';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-form-step',
  templateUrl: './form-step.component.html',
  styleUrls: ['./form-step.component.less']
})
export class FormStepComponent implements OnInit, OnDestroy {

  public userForm: FormGroup;
  public isMoreEighteenAge = false;
  public genderItems: SelectItemModel[] = [
    new SelectItemModel(GendersEnum.man, 'Мужской'),
    new SelectItemModel(GendersEnum.woman, 'Женский')
  ];
  public familyStatuses: SelectItemModel[] = [];
  public isDisableButton = false;

  private attemptCounter = 0;
  private $changeGender: Subscription;
  private $changeBirthday: Subscription;
  private readonly router: Router;
  private readonly dataService: DataService;
  private readonly formBuilder: FormBuilder;
  private readonly userStore: Store<fromRoot.State>;

  constructor(router: Router,
              dataService: DataService,
              formBuilder: FormBuilder,
              userStore: Store<fromRoot.State>) {
    this.router = router;
    this.dataService = dataService;
    this.formBuilder = formBuilder;
    this.userStore = userStore;
  }

  public ngOnInit(): void {
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
    const controlNames = Object.keys(this.userForm.controls);
    const controls = this.userForm.controls;
    this.attemptCounter++;

    if (this.userForm.invalid) {
      if (this.attemptCounter === 3) {
        this.attemptCounter = 0;

        controlNames.forEach((controlName: string) => {
          controls[controlName].reset();
          controls[controlName].markAsTouched();
        });

        return;
      }

      controlNames.forEach((controlName: string) => controls[controlName].markAsTouched());

      this.setButtonDelay();

      return;
    }

    const data = new UserDataModel();
    controlNames.forEach((controlName: string) => data[controlName] = controls[controlName].value);
    this.dataService.sendData(data);
    this.userStore.dispatch(new formAction.SetDataStatus(true));
    this.userStore.dispatch(new formAction.UpdateUserData(data));
    this.router.navigate(['success']);
  }

  private setFamilyStatuses = (): void => {
    this.familyStatuses = [];
    this.familyStatuses.push(new SelectItemModel(null, 'Не выбрано'));

    switch (this.userForm.get('gender').value) {
      case GendersEnum.man:
        this.familyStatuses.push(new SelectItemModel(FamiliesEnum.marriedForMan, 'Женат'));
        break;
      case GendersEnum.woman:
        this.familyStatuses.push(new SelectItemModel(FamiliesEnum.marriedForWoman, 'Замужем'));
        break;
      default:
        this.familyStatuses.push(new SelectItemModel(FamiliesEnum.marriedForMan, 'Женат'));
        this.familyStatuses.push(new SelectItemModel(FamiliesEnum.marriedForWoman, 'Замужем'));
        break;
    }

    this.familyStatuses.push(new SelectItemModel(FamiliesEnum.divorced, 'В разводе'));
    this.familyStatuses.push(new SelectItemModel(FamiliesEnum.none, 'Нет'));
  }


  private initForm(): void {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, this.nameValidator]],
      gender: [null, Validators.required],
      birthday: [null, Validators.required],
      family: [null, Validators.required],
      children: [null],
      email: [null, [Validators.required, this.emailValidator]],
      comment: [null, this.commentValidator]
    });
  }

  private nameValidator(control: FormControl): ValidationErrors | null {
    const value = String(control.value);
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
    const value = String(control.value);
    const isValidEmail = /\S+@\S+\.\S+/.test(value);

    if (!isValidEmail) {
      return { isInvalidEmail: true };
    }

    return null;
  }

  private commentValidator(control: FormControl): ValidationErrors | null {
    if (control.value === null) {
      return null;
    }

    const value = String(control.value);
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

    this.userForm.get('family').updateValueAndValidity();

  }

  private setButtonDelay(): void {
    this.isDisableButton = true;

    window.setTimeout(() => this.isDisableButton = false, 10 * 1000);
  }

}

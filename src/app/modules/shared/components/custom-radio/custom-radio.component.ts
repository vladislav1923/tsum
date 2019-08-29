import {Component, forwardRef, Input} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SelectItemModel} from '../../../../models/select-item.model';
import {MatRadioChange} from "@angular/material";

@Component({
  selector: 'custom-radio',
  templateUrl: './custom-radio.component.html',
  styleUrls: ['./custom-radio.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomRadioComponent),
    multi: true
  }]
})
export class CustomRadioComponent implements ControlValueAccessor {

  @Input()
  public control: AbstractControl;

  @Input()
  public items: SelectItemModel[] = [];

  @Input()
  public placeholder = 'Укажите значение';

  public value: string | null = null;

  private onChange: (_: any) => void;
  private onTouched: () => void;

  constructor() {
    this.onChange = (_: any) => {};
    this.onTouched = () => {};
  }

  public setValue(event: MatRadioChange): void {
    this.value = event.value;
    this.onChange(this.value);
    this.onTouched();
  }

  public writeValue(obj: any): void {
    if (obj !== undefined) {
      this.value = obj;
      this.onChange(this.value);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    // ...
  }

}

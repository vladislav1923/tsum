import {Component, forwardRef, Input} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomDatepickerComponent),
    multi: true
  }]
})
export class CustomDatepickerComponent implements ControlValueAccessor {

  @Input()
  public control: AbstractControl;

  @Input()
  public placeholder = 'Укажите значение';

  public value: string | null = null;

  private onChange: (_: any) => void;
  private onTouched: () => void;

  constructor() {
    this.onChange = (_: any) => {};
    this.onTouched = () => {};
  }

  public setValue(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
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

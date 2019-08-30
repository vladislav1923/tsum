import {Component, forwardRef, Input, OnDestroy} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrls: ['./custom-counter.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomCounterComponent),
    multi: true
  }]
})
export class CustomCounterComponent implements ControlValueAccessor, OnDestroy {

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

  public onFocus(): void {
    document.addEventListener('keypress', this.keyDownHandler);
  }

  public onBlur(): void {
    document.removeEventListener('keypress', this.keyDownHandler);
  }

  public increment(event: Event): void {
    event.preventDefault();
    this.value = String(Number(this.value) + 1);
    this.onChange(this.value);
    this.onTouched();
  }

  public decrement(event: Event): void {
    event.preventDefault();
    if (Number(this.value) > 0) {
      this.value = String(Number(this.value) - 1);
      this.onChange(this.value);
      this.onTouched();
    }
  }

  public writeValue(obj: any): void {
    if (obj !== undefined) {
      this.value = obj;
      this.onChange(this.value);
      this.onTouched();
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

  public ngOnDestroy(): void {
    this.onBlur();
  }

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key.charCodeAt(0) === 43) {
      this.increment(event);
    }

    if (event.key.charCodeAt(0) === 45) {
      this.decrement(event);
    }
  }

}
